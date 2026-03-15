// app.js — March Mascot Madness core logic

// ─── State ───────────────────────────────────────────────────────────────────
let state = {
  picks: {},        // matchupKey -> winning team id
  round: 1,        // current round (1–6)
  matchupIndex: 0, // index within the current round's matchup queue
  done: false,
};

const STORAGE_KEY = `mmm_${TOURNAMENT_YEAR}_state`;
const ROUND_NAMES = ["Round of 64", "Round of 32", "Sweet 16", "Elite Eight", "Final Four", "Championship"];

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
  state = { picks: {}, round: 1, matchupIndex: 0, done: false };
}

// ─── Bracket Logic ────────────────────────────────────────────────────────────
function getMatchupsForRound(round) {
  if (round === 1) {
    return FIRST_ROUND_MATCHUPS;
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
  } else if (state.matchupIndex === 0 && state.round > 1) {
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
  return 63; // 32+16+8+4+2+1
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

  const roundName = ROUND_NAMES[state.round - 1];
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
  const championId = getChampion();
  const champion = championId ? getTeam(championId) : null;

  document.getElementById("matchup-view").style.display = "none";
  document.getElementById("complete-view").style.display = "flex";

  if (champion) {
    document.getElementById("champion-img").src = getMascotImage(champion);
    document.getElementById("champion-img").alt = champion.mascot;
    document.getElementById("champion-name").textContent = champion.mascot;
    document.getElementById("champion-school").textContent = champion.school;
  }

  // Update progress bar to show 63/63
  document.getElementById("progress-bar").style.width = progressPercent() + "%";
  document.getElementById("progress-text").textContent = `${completedMatchups()} / ${totalMatchups()} games picked`;
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

  document.getElementById("restart-btn").addEventListener("click", () => {
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
