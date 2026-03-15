// app.js — March Mascot Madness core logic

// ─── State ───────────────────────────────────────────────────────────────────
let state = {
  picks: {},        // matchupKey -> winning team id
  round: 0,        // current round (0=First Four, 1–6)
  matchupIndex: 0, // index within the current round's matchup queue
  done: false,
};

const STORAGE_KEY = `mmm_${TOURNAMENT_YEAR}_state`;
const ROUND_NAMES = ["First Four", "Round of 64", "Round of 32", "Sweet 16", "Elite Eight", "Final Four", "Championship"];

// ─── Persistence ─────────────────────────────────────────────────────────────
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { state = JSON.parse(raw); } catch(e) { /* ignore */ }
  }
}

function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  state = { picks: {}, round: 0, matchupIndex: 0, done: false };
}

// ─── Bracket Logic ────────────────────────────────────────────────────────────
function resolvePlayIn(teamId) {
  const game = FIRST_FOUR_GAMES.find(g => g.replacesTeamId === teamId);
  if (!game) return teamId;
  const key = matchupKey(game.matchup);
  return state.picks[key] || teamId;
}

function getMatchupsForRound(round) {
  if (round === 0) {
    return FIRST_FOUR_MATCHUPS;
  }
  if (round === 1) {
    return FIRST_ROUND_MATCHUPS.map(([a, b]) => [resolvePlayIn(a), resolvePlayIn(b)]);
  }
  const prevMatchups = getMatchupsForRound(round - 1);
  const result = [];
  for (let i = 0; i < prevMatchups.length; i += 2) {
    const keyA = matchupKey(prevMatchups[i]);
    const keyB = matchupKey(prevMatchups[i + 1]);
    const winA = state.picks[keyA];
    const winB = state.picks[keyB];
    if (winA && winB) result.push([winA, winB]);
  }
  return result;
}

function matchupKey([a, b]) {
  return [a, b].sort().join("__vs__");
}

function currentMatchups() {
  return getMatchupsForRound(state.round);
}

function currentMatchup() {
  const matchups = currentMatchups();
  if (state.matchupIndex >= matchups.length) return null;
  return matchups[state.matchupIndex];
}

function recordPick(winnerId) {
  const matchup = currentMatchup();
  if (!matchup) return;
  const key = matchupKey(matchup);
  state.picks[key] = winnerId;
  state.matchupIndex++;

  // Check if round is complete
  const matchups = currentMatchups();
  if (state.matchupIndex >= matchups.length) {
    if (state.round === 6) {
      state.done = true;
    } else {
      state.round++;
      state.matchupIndex = 0;
    }
  }
  saveState();
}

function goBack() {
  if (completedMatchups() === 0) return; // nothing to undo

  if (state.done) {
    // Was on the complete screen — step back into the championship game
    state.done = false;
    state.round = 6;
    state.matchupIndex = 0;
  } else if (state.matchupIndex === 0 && state.round > 0) {
    // At the first game of a later round — go back to last game of previous round
    state.round--;
    state.matchupIndex = getMatchupsForRound(state.round).length - 1;
  } else {
    // Mid-round — just step back one game
    state.matchupIndex--;
  }

  // Erase the pick for the matchup we just stepped back to
  const matchup = currentMatchup();
  if (matchup) {
    delete state.picks[matchupKey(matchup)];
  }

  saveState();

  // Make sure matchup view is visible (in case we backed out of the complete screen)
  document.getElementById("matchup-view").style.display = "flex";
  document.getElementById("complete-view").style.display = "none";

  renderMatchup();
}

function getChampion() {
  if (!state.done) return null;
  const finalMatchups = getMatchupsForRound(6);
  if (!finalMatchups.length) return null;
  return state.picks[matchupKey(finalMatchups[0])];
}

function totalMatchups() {
  return 67; // 4 + 32+16+8+4+2+1
}

function completedMatchups() {
  return Object.keys(state.picks).length;
}

// ─── UI ───────────────────────────────────────────────────────────────────────
function placeholderSVG(team) {
  const colors = [
    ["#1a3a6b","#e8c84e"], ["#8b1a1a","#f5f5f5"], ["#0d5c3a","#ffd700"],
    ["#1f4b8e","#e87c1a"], ["#4a1a6e","#c5a028"], ["#0a4c2b","#d4af37"],
    ["#7a1f1f","#1f4b7a"], ["#2d4a1a","#e8a020"], ["#3a0d6e","#8bc34a"],
    ["#1a4a5c","#e84a20"], ["#5c3a0a","#4a8bc3"], ["#0a3a5c","#e8c820"],
  ];
  const idx = (team.mascot.charCodeAt(0) + team.school.charCodeAt(0)) % colors.length;
  const [bg, fg] = colors[idx];
  const initials = team.mascot.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" rx="100" fill="${bg}"/>
      <text x="100" y="115" font-family="Georgia,serif" font-size="72" font-weight="bold"
            fill="${fg}" text-anchor="middle">${initials}</text>
    </svg>
  `)}`;
}

function getMascotImage(team) {
  if (team.image) return team.image;
  return placeholderSVG(team);
}

function progressPercent() {
  return Math.round((completedMatchups() / totalMatchups()) * 100);
}

function updateBackButton() {
  const btn = document.getElementById("back-btn");
  if (btn) btn.disabled = completedMatchups() === 0;
}

function renderMatchup() {
  const matchup = currentMatchup();

  if (state.done) {
    renderComplete();
    return;
  }

  if (!matchup) {
    renderComplete();
    return;
  }

  const [idA, idB] = matchup;
  const teamA = getTeam(idA);
  const teamB = getTeam(idB);

  const roundName = ROUND_NAMES[state.round];
  const matchupNum = state.matchupIndex + 1;
  const totalInRound = currentMatchups().length;

  document.getElementById("round-label").textContent = roundName;
  document.getElementById("matchup-counter").textContent = `Game ${matchupNum} of ${totalInRound}`;
  document.getElementById("progress-bar").style.width = progressPercent() + "%";
  document.getElementById("progress-text").textContent = `${completedMatchups()} / ${totalMatchups()} games picked`;

  renderTeamCard("card-a", teamA, idA);
  renderTeamCard("card-b", teamB, idB);

  document.getElementById("vs-label").style.display = "flex";

  updateBackButton();

  // Animate in
  const arena = document.getElementById("arena");
  arena.classList.remove("slide-in");
  void arena.offsetWidth;
  arena.classList.add("slide-in");
}

function renderTeamCard(cardId, team, teamId) {
  const card = document.getElementById(cardId);
  card.classList.remove("winner", "loser");
  card.style.cssText = ""; // clear all inline styles
  card.onclick = () => handlePick(teamId);
  card.querySelector(".mascot-img").src = getMascotImage(team);
  card.querySelector(".mascot-img").alt = team.mascot;
  card.querySelector(".mascot-name").textContent = team.mascot;
}

function handlePick(winnerId) {
  const matchup = currentMatchup();
  if (!matchup) return;

  const [idA, idB] = matchup;
  const loserId = winnerId === idA ? idB : idA;

  const winCard = winnerId === idA ? document.getElementById("card-a") : document.getElementById("card-b");
  const loseCard = loserId === idA ? document.getElementById("card-a") : document.getElementById("card-b");
  winCard.classList.add("winner");
  loseCard.classList.add("loser");

  // Disable cards during animation to prevent double-picks
  document.getElementById("card-a").onclick = null;
  document.getElementById("card-b").onclick = null;

  setTimeout(() => {
    recordPick(winnerId);
    renderMatchup();
  }, 600);
}

function renderComplete() {
  document.getElementById("matchup-view").style.display = "none";
  document.getElementById("complete-view").style.display = "flex";

  // Update progress bar to show 63/63
  document.getElementById("progress-bar").style.width = progressPercent() + "%";
  document.getElementById("progress-text").textContent = `${completedMatchups()} / ${totalMatchups()} games picked`;

  // Show bracket visualization
  renderBracketVisualization();
}

// ─── Bracket Visualization ────────────────────────────────────────────────────
function buildBracketForRegion(region) {
  const regionTeams = TEAMS.filter(t => t.region === region).sort((a, b) => a.seed - b.seed);
  
  // Build bracket structure: rounds 1-4 for each region
  const rounds = [];
  
  // Round 1: First round matchups in standard NCAA bracket order
  const round1 = [];
  BRACKET_SEED_ORDER.forEach(([seedA, seedB]) => {
    const team1Id = resolvePlayIn(regionTeams[seedA - 1].id);
    const team2Id = resolvePlayIn(regionTeams[seedB - 1].id);
    const matchupKey1 = matchupKey([team1Id, team2Id]);
    const winner = state.picks[matchupKey1];
    round1.push({
      team1: team1Id,
      team2: team2Id,
      winner: winner,
    });
  });
  rounds.push(round1);
  
  // Rounds 2-4: Build forward from picks
  for (let round = 2; round <= 4; round++) {
    const prevRound = rounds[round - 2];
    const roundMatchups = [];
    for (let i = 0; i < prevRound.length; i += 2) {
      const winner1 = prevRound[i].winner;
      const winner2 = prevRound[i + 1].winner;
      if (winner1 && winner2) {
        const key = matchupKey([winner1, winner2]);
        const winner = state.picks[key];
        roundMatchups.push({
          team1: winner1,
          team2: winner2,
          winner: winner,
        });
      } else {
        // If we don't have both winners yet, add placeholder matchup
        roundMatchups.push({
          team1: winner1,
          team2: winner2,
          winner: null,
        });
      }
    }
    if (roundMatchups.length > 0) {
      rounds.push(roundMatchups);
    }
  }
  
  return rounds;
}

function renderBracketVisualization() {
  const container = document.getElementById("bracket-view");
  
  if (!container) {
    console.error("Bracket container not found");
    return;
  }
  
  container.innerHTML = "";
  
  const regions = ["South", "East", "Midwest", "West"];
  
  // Render each region
  regions.forEach(region => {
    const rounds = buildBracketForRegion(region);
    
    const regionDiv = document.createElement("div");
    regionDiv.className = `region-bracket ${region.toLowerCase()}`;
    
    const regionLabel = document.createElement("div");
    regionLabel.className = "region-name";
    regionLabel.textContent = region;
    regionDiv.appendChild(regionLabel);
    
    // Render rounds horizontally
    const roundsContainer = document.createElement("div");
    roundsContainer.style.display = "flex";
    roundsContainer.style.gap = "0.5rem";
    
    // For West and Midwest (right side), reverse the order so rounds flow right to left
    const roundsToDisplay = (region === "West" || region === "Midwest") 
      ? rounds.slice().reverse() 
      : rounds;
    
    roundsToDisplay.forEach(roundMatchups => {
      const roundDiv = document.createElement("div");
      roundDiv.className = "bracket-round";
      roundDiv.style.flex = "1";
      
      roundMatchups.forEach(matchup => {
        const matchupDiv = document.createElement("div");
        matchupDiv.className = "bracket-matchup";
        
        // Team 1
        const team1El = matchup.team1 ? createBracketTeamEl(matchup.team1, matchup.winner === matchup.team1) : null;
        if (team1El) matchupDiv.appendChild(team1El);
        
        // Team 2
        const team2El = matchup.team2 ? createBracketTeamEl(matchup.team2, matchup.winner === matchup.team2) : null;
        if (team2El) matchupDiv.appendChild(team2El);
        
        roundDiv.appendChild(matchupDiv);
      });
      
      roundsContainer.appendChild(roundDiv);
    });
    
    regionDiv.appendChild(roundsContainer);
    container.appendChild(regionDiv);
  });
  
  // Add championship section in the middle
  const champSection = document.createElement("div");
  champSection.className = "championship-section";
  
  // Get final 4 teams (region winners)
  const finalFour = {};
  regions.forEach(region => {
    const rounds = buildBracketForRegion(region);
    const finalRound = rounds[rounds.length - 1];
    finalFour[region] = finalRound && finalRound[0] ? finalRound[0].winner : null;
  });
  
  // East vs South Semi-Final (left side)
  if (finalFour.East && finalFour.South) {
    const match1 = document.createElement("div");
    match1.className = "final-four-matchup";
    
    const label1 = document.createElement("div");
    label1.className = "final-four-label";
    label1.textContent = "East vs South";
    match1.appendChild(label1);
    
    const matchupDiv1 = document.createElement("div");
    matchupDiv1.className = "championship-matchup";
    
    const key1 = matchupKey([finalFour.East, finalFour.South]);
    const winner1 = state.picks[key1];
    
    const team1 = createBracketTeamEl(finalFour.East, winner1 === finalFour.East);
    if (team1) {
      team1.classList.add("championship-team");
      matchupDiv1.appendChild(team1);
    }
    
    const team2 = createBracketTeamEl(finalFour.South, winner1 === finalFour.South);
    if (team2) {
      team2.classList.add("championship-team");
      matchupDiv1.appendChild(team2);
    }
    
    match1.appendChild(matchupDiv1);
    champSection.appendChild(match1);
  }
  
  // Championship Game (center)
  const champMatch = document.createElement("div");
  champMatch.className = "final-four-matchup";
  
  const champLabel = document.createElement("div");
  champLabel.className = "final-four-label";
  champLabel.textContent = "Championship";
  champMatch.appendChild(champLabel);
  
  const champMatchupDiv = document.createElement("div");
  champMatchupDiv.className = "championship-matchup";
  
  // Get the two finalists
  const esKey = matchupKey([finalFour.East, finalFour.South]);
  const esWinner = state.picks[esKey];
  
  const wmKey = matchupKey([finalFour.West, finalFour.Midwest]);
  const wmWinner = state.picks[wmKey];
  
  const champion = getChampion();
  
  if (esWinner && wmWinner) {
    // Determine who is champion and who is runner-up
    let finalist1 = esWinner;
    let finalist2 = wmWinner;
    let isFinalist1Champ = champion === esWinner;
    
    const finalistEl1 = createBracketTeamEl(finalist1, isFinalist1Champ);
    if (finalistEl1) {
      finalistEl1.classList.add("championship-team");
      champMatchupDiv.appendChild(finalistEl1);
    }
    
    const finalistEl2 = createBracketTeamEl(finalist2, !isFinalist1Champ);
    if (finalistEl2) {
      finalistEl2.classList.add("championship-team");
      champMatchupDiv.appendChild(finalistEl2);
    }
  } else if (esWinner) {
    const finalistEl = createBracketTeamEl(esWinner, esWinner === champion);
    if (finalistEl) {
      finalistEl.classList.add("championship-team");
      champMatchupDiv.appendChild(finalistEl);
    }
  } else if (wmWinner) {
    const finalistEl = createBracketTeamEl(wmWinner, wmWinner === champion);
    if (finalistEl) {
      finalistEl.classList.add("championship-team");
      champMatchupDiv.appendChild(finalistEl);
    }
  }
  
  champMatch.appendChild(champMatchupDiv);
  champSection.appendChild(champMatch);
  
  // Add champion logo in the middle if tournament is complete
  if (champion) {
    const champLogoDiv = document.createElement("div");
    champLogoDiv.className = "champion-logo";
    
    const champTeam = getTeam(champion);
    if (champTeam) {
      const logoImg = document.createElement("img");
      logoImg.src = getMascotImage(champTeam);
      logoImg.alt = champTeam.mascot;
      champLogoDiv.appendChild(logoImg);
    }
    
    champSection.appendChild(champLogoDiv);
  }
  
  container.appendChild(champSection);
  
  // West vs Midwest Semi-Final (right side)
  if (finalFour.West && finalFour.Midwest) {
    const match2 = document.createElement("div");
    match2.className = "final-four-matchup";
    
    const label2 = document.createElement("div");
    label2.className = "final-four-label";
    label2.textContent = "West vs Midwest";
    match2.appendChild(label2);
    
    const matchupDiv2 = document.createElement("div");
    matchupDiv2.className = "championship-matchup";
    
    const key2 = matchupKey([finalFour.West, finalFour.Midwest]);
    const winner2 = state.picks[key2];
    
    const team3 = createBracketTeamEl(finalFour.West, winner2 === finalFour.West);
    if (team3) {
      team3.classList.add("championship-team");
      matchupDiv2.appendChild(team3);
    }
    
    const team4 = createBracketTeamEl(finalFour.Midwest, winner2 === finalFour.Midwest);
    if (team4) {
      team4.classList.add("championship-team");
      matchupDiv2.appendChild(team4);
    }
    
    match2.appendChild(matchupDiv2);
    champSection.appendChild(match2);
  }

  // ─── Play-In Games Section ──────────────────────────────────────────────────
  const playInSection = document.createElement("div");
  playInSection.className = "play-in-section";

  const playInTitle = document.createElement("div");
  playInTitle.className = "play-in-title";
  playInTitle.textContent = "First Four";
  playInSection.appendChild(playInTitle);

  const playInGames = document.createElement("div");
  playInGames.className = "play-in-games";

  FIRST_FOUR_GAMES.forEach(game => {
    const gameDiv = document.createElement("div");
    gameDiv.className = "play-in-game";

    const label = document.createElement("div");
    label.className = "play-in-label";
    label.textContent = `${game.region} #${game.seed} Seed`;
    gameDiv.appendChild(label);

    const matchupDiv = document.createElement("div");
    matchupDiv.className = "bracket-matchup";

    const key = matchupKey(game.matchup);
    const winner = state.picks[key];

    const team1El = createBracketTeamEl(game.matchup[0], winner === game.matchup[0]);
    if (team1El) matchupDiv.appendChild(team1El);

    const team2El = createBracketTeamEl(game.matchup[1], winner === game.matchup[1]);
    if (team2El) matchupDiv.appendChild(team2El);

    gameDiv.appendChild(matchupDiv);
    playInGames.appendChild(gameDiv);
  });

  playInSection.appendChild(playInGames);
  container.appendChild(playInSection);
}

function createBracketTeamEl(teamId, isWinner = false, isChamp = false) {
  if (!teamId) return null;
  
  const team = getTeam(teamId);
  if (!team) return null;
  
  const teamEl = document.createElement("div");
  teamEl.className = `bracket-team ${isWinner ? "winner-team" : ""}`;
  
  const seedEl = document.createElement("div");
  seedEl.className = "bracket-team-seed";
  seedEl.textContent = `#${team.seed}`;
  
  const mascotEl = document.createElement("div");
  mascotEl.className = "bracket-team-mascot";
  mascotEl.textContent = team.mascot;
  
  const schoolEl = document.createElement("div");
  schoolEl.className = "bracket-team-school";
  schoolEl.textContent = team.school;
  
  if (isChamp) {
    teamEl.className = "championship-team winner-team";
    seedEl.className = "championship-team-seed";
    mascotEl.className = "championship-team-mascot";
    schoolEl.className = "championship-team-school";
  }
  
  teamEl.appendChild(seedEl);
  teamEl.appendChild(mascotEl);
  teamEl.appendChild(schoolEl);
  
  return teamEl;
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadState();

  document.getElementById("back-btn").addEventListener("click", goBack);

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Start over? All picks will be lost.")) {
      resetState();
      document.getElementById("matchup-view").style.display = "flex";
      document.getElementById("complete-view").style.display = "none";
      renderMatchup();
    }
  });


  if (state.done) {
    renderComplete();
  } else {
    renderMatchup();
  }
});
