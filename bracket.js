// 2025 NCAA Tournament Bracket Data
// To update for a new year: edit the teams below and update TOURNAMENT_YEAR
// Seeds are stored here but never shown to the user

const TOURNAMENT_YEAR = 2026;

// Each team: { id, school, mascot, seed, region, image }
// image: path to mascot image (e.g. "images/tiger.png") or null for placeholder
const TEAMS = [
  { id: "michigan",    school: "Michigan",       mascot: "Wolverine",          seed: 1,  region: "South",   image: "images/wolverine.jpg" },
  { id: "florida",     school: "Florida",        mascot: "Albert",             seed: 1,  region: "East",    image: "images/albert.jpg" },
  { id: "arizona",     school: "Arizona",        mascot: "Wilbur and Wilma",   seed: 1,  region: "Midwest", image: "images/wilbur.jpg" },
  { id: "duke",        school: "Duke",           mascot: "Blue Devil",         seed: 1,  region: "West",    image: "images/bluedevil.jpg" },

  { id: "houston",     school: "Houston",        mascot: "Shasta",            seed: 2,  region: "South",   image: "images/shasta.jpg" },
  { id: "uconn",       school: "UConn",          mascot: "Jonathan",           seed: 2,  region: "East",    image: "images/jonathan.jpg" },
  { id: "michigan_st", school: "Michigan State", mascot: "Sparty",             seed: 2,  region: "Midwest", image: "images/sparty.jpg" },
  { id: "iowa_state",  school: "Iowa State",     mascot: "Cy",                 seed: 2,  region: "West",    image: "images/cy.jpg" },

  { id: "purdue",      school: "Purdue",         mascot: "Pete",               seed: 3,  region: "South",   image: "images/pete.jpg" },
  { id: "illinois",    school: "Illinois",       mascot: "Kingfisher",         seed: 3,  region: "East",    image: "images/kingfischer.jpg" },
  { id: "gonzaga",     school: "Gonzaga",        mascot: "Spike",              seed: 3,  region: "Midwest", image: "images/spike.jpg" },
  { id: "virginia",    school: "Virginia",       mascot: "The Cavalier",       seed: 3,  region: "West",    image: "images/cavalier.jpg" },

  { id: "nebraska",    school: "Nebraska",       mascot: "Herbie",             seed: 4,  region: "South",   image: "images/herbie.jpg" },
  { id: "vanderbilt",  school: "Vanderbilt",     mascot: "Mr. Commodore",      seed: 4,  region: "East",    image: "images/mrcommodore.jpg" },
  { id: "st_johns",    school: "St John's",      mascot: "Johnny Thunderbird", seed: 4,  region: "Midwest", image: "images/johnnythunderbird.jpg" },
  { id: "alabama",     school: "Alabama",        mascot: "Big Al",             seed: 4,  region: "West",    image: "images/bigal.jpg" },

  { id: "arkansas",    school: "Arkansas",       mascot: "The Razorback",      seed: 5,  region: "South",   image: "images/razorback.jpg" },
  { id: "kansas",      school: "Kansas",         mascot: "Big Jay",            seed: 5,  region: "East",    image: "images/bigjay.jpg" },
  { id: "texas_tech",  school: "Texas Tech",     mascot: "Raider Red",         seed: 5,  region: "Midwest", image: "images/raiderred.jpg" },
  { id: "wisconsin",   school: "Wisconsin",      mascot: "Bucky",              seed: 5,  region: "West",    image: "images/bucky.jpg" },

  { id: "tennessee",   school: "Tennessee",      mascot: "Smokey",             seed: 6,  region: "South",   image: "images/smokey.jpg" },
  { id: "byu",         school: "BYU",            mascot: "Cosmo",              seed: 6,  region: "East",    image: "images/cosmo.jpg" },
  { id: "unc",         school: "North Carolina", mascot: "Rameses",            seed: 6,  region: "Midwest", image: "images/rameses.jpg" },
  { id: "louisville",  school: "Louisville",     mascot: "Louie",              seed: 6,  region: "West",    image: "images/louie.jpg" },

  { id: "kentucky",    school: "Kentucky",       mascot: "The Wildcat",        seed: 7,  region: "South",   image: "images/thewildcat.jpg" },
  { id: "saint_marys", school: "Saint Mary's",   mascot: "Gael",               seed: 7,  region: "East",    image: "images/gael.jpg" },
  { id: "miami",       school: "Miami (FL)",     mascot: "Sebastian",          seed: 7,  region: "Midwest", image: "images/sebastian.jpg" },
  { id: "ucla",        school: "UCLA",           mascot: "Joe Bruin",          seed: 7,  region: "West",    image: "images/joebruin.jpg" },

  { id: "utah_state",  school: "Utah State",     mascot: "Big Blue",           seed: 8,  region: "South",   image: "images/bigblue.jpg" },
  { id: "clemson",     school: "Clemson",        mascot: "The Tiger",          seed: 8,  region: "East",    image: "images/thetiger.jpg" },
  { id: "ohio_state",  school: "Ohio State",     mascot: "Brutus",             seed: 8,  region: "Midwest", image: "images/brutus.jpg" },
  { id: "georgia",     school: "Georgia",        mascot: "Hairy Dawg",         seed: 8,  region: "West",    image: "images/hairydawg.jpg" },

  { id: "todo21",      school: "todo",       mascot: "todo",     seed: 9,  region: "South",   image: null },
  { id: "todo22",      school: "todo",       mascot: "todo",     seed: 9,  region: "East",    image: null },
  { id: "todo23",      school: "todo",       mascot: "todo",     seed: 9,  region: "Midwest", image: null },
  { id: "todo24",      school: "todo",       mascot: "todo",     seed: 9,  region: "West",    image: null },

  { id: "todo25",      school: "todo",       mascot: "todo",     seed: 10, region: "South",   image: null },
  { id: "todo26",      school: "todo",       mascot: "todo",     seed: 10, region: "East",    image: null },
  { id: "todo27",      school: "todo",       mascot: "todo",     seed: 10, region: "Midwest", image: null },
  { id: "todo28",      school: "todo",       mascot: "todo",     seed: 10, region: "West",    image: null },

  { id: "todo29",      school: "todo",       mascot: "todo",     seed: 11, region: "South",   image: null },
  { id: "todo30",      school: "todo",       mascot: "todo",     seed: 11, region: "East",    image: null },
  { id: "todo31",      school: "todo",       mascot: "todo",     seed: 11, region: "Midwest", image: null },
  { id: "todo32",      school: "todo",       mascot: "todo",     seed: 11, region: "West",    image: null },

  { id: "todo33",      school: "todo",       mascot: "todo",     seed: 12, region: "South",   image: null },
  { id: "todo34",      school: "todo",       mascot: "todo",     seed: 12, region: "East",    image: null },
  { id: "todo35",      school: "todo",       mascot: "todo",     seed: 12, region: "Midwest", image: null },
  { id: "todo36",      school: "todo",       mascot: "todo",     seed: 12, region: "West",    image: null },

  { id: "todo37",      school: "todo",       mascot: "todo",     seed: 13, region: "South",   image: null },
  { id: "todo38",      school: "todo",       mascot: "todo",     seed: 13, region: "East",    image: null },
  { id: "todo39",      school: "todo",       mascot: "todo",     seed: 13, region: "Midwest", image: null },
  { id: "todo40",      school: "todo",       mascot: "todo",     seed: 13, region: "West",    image: null },

  { id: "todo41",      school: "todo",       mascot: "todo",     seed: 14, region: "South",   image: null },
  { id: "todo42",      school: "todo",       mascot: "todo",     seed: 14, region: "East",    image: null },
  { id: "todo43",      school: "todo",       mascot: "todo",     seed: 14, region: "Midwest", image: null },
  { id: "todo44",      school: "todo",       mascot: "todo",     seed: 14, region: "West",    image: null },

  { id: "todo45",      school: "todo",       mascot: "todo",     seed: 15, region: "South",   image: null },
  { id: "todo46",      school: "todo",       mascot: "todo",     seed: 15, region: "East",    image: null },
  { id: "todo47",      school: "todo",       mascot: "todo",     seed: 15, region: "Midwest", image: null },
  { id: "todo48",      school: "todo",       mascot: "todo",     seed: 15, region: "West",    image: null },

  { id: "todo49",      school: "todo",       mascot: "todo",     seed: 16, region: "South",   image: null },
  { id: "todo50",      school: "todo",       mascot: "todo",     seed: 16, region: "East",    image: null },
  { id: "todo51",      school: "todo",       mascot: "todo",     seed: 16, region: "Midwest", image: null },
  { id: "todo52",      school: "todo",       mascot: "todo",     seed: 16, region: "West",    image: null },
];

// Generate first-round matchups in standard NCAA bracket order.
// Bracket order ensures correct progression: 1/16 winner faces 8/9 winner, etc.
// Seed pairings in bracket order: (1,16),(8,9),(5,12),(4,13),(6,11),(3,14),(7,10),(2,15)
const BRACKET_SEED_ORDER = [[1,16],[8,9],[5,12],[4,13],[6,11],[3,14],[7,10],[2,15]];

function generateFirstRoundMatchups() {
  const regions = [...new Set(TEAMS.map(t => t.region))].sort();
  const matchups = [];
  
  regions.forEach(region => {
    const regionTeams = TEAMS.filter(t => t.region === region).sort((a, b) => a.seed - b.seed);
    BRACKET_SEED_ORDER.forEach(([seedA, seedB]) => {
      matchups.push([regionTeams[seedA - 1].id, regionTeams[seedB - 1].id]);
    });
  });
  
  return matchups;
}

const FIRST_ROUND_MATCHUPS = generateFirstRoundMatchups();

// Helper: look up a team by id
function getTeam(id) {
  return TEAMS.find(t => t.id === id);
}
