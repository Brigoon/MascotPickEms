// 2025 NCAA Tournament Bracket Data
// To update for a new year: edit the teams below and update TOURNAMENT_YEAR
// Seeds are stored here but never shown to the user

const TOURNAMENT_YEAR = 2026;

// Each team: { id, school, mascot, seed, region, image }
// image: path to mascot image (e.g. "images/tiger.png") or null for placeholder
const TEAMS = [
  /* ========== EAST ========== */
  { id: "duke",          school: "Duke",               mascot: "Blue Devil",         seed: 1,  region: "East", image: "images/bluedevil.jpg" },
  { id: "uconn",         school: "UConn",              mascot: "Jonathan",           seed: 2,  region: "East", image: "images/jonathan.jpg" },
  { id: "michigan_st",   school: "Michigan State",     mascot: "Sparty",             seed: 3,  region: "East", image: "images/sparty.jpg" },
  { id: "kansas",        school: "Kansas",             mascot: "Big Jay",            seed: 4,  region: "East", image: "images/bigjay.jpg" },
  { id: "st_johns",      school: "St John's",          mascot: "Johnny Thunderbird", seed: 5,  region: "East", image: "images/johnnythunderbird.jpg" },
  { id: "louisville",    school: "Louisville",         mascot: "Louie",              seed: 6,  region: "East", image: "images/louie.jpg" },
  { id: "ucla",          school: "UCLA",               mascot: "Joe Bruin",          seed: 7,  region: "East", image: "images/joebruin.jpg" },
  { id: "ohio_state",    school: "Ohio State",         mascot: "Brutus",             seed: 8,  region: "East", image: "images/brutus.jpg" },
  { id: "tcu",           school: "TCU",                mascot: "Superfrog",          seed: 9,  region: "East", image: "images/superfrog.jpg" },
  { id: "ucf",           school: "UCF",                mascot: "Knightro",           seed: 10, region: "East", image: "images/knightro.jpg" },
  { id: "usf",           school: "USF",                mascot: "Rocky",              seed: 11, region: "East", image: "images/rocky.jpg" },
  { id: "northern_iowa", school: "Northern Iowa",      mascot: "TC and TK",          seed: 12, region: "East", image: "images/tctk.jpg" },
  { id: "cal_baptist",   school: "Cal Baptist",        mascot: "Lance",              seed: 13, region: "East", image: "images/lance.jpg" },
  { id: "nd_state",      school: "North Dakota State", mascot: "Thundar",            seed: 14, region: "East", image: "images/thundar.jpg" },
  { id: "furman",        school: "Furman",             mascot: "The Paladin",        seed: 15, region: "East", image: "images/paladin.jpg" },
  { id: "siena",         school: "Siena",              mascot: "Bernie",             seed: 16, region: "East", image: "images/bernie.jpg" },

  /* ========== WEST ========== */
  { id: "arizona",        school: "Arizona",        mascot: "Wilbur and Wilma", seed: 1,  region: "West", image: "images/wilbur.jpg" },
  { id: "purdue",         school: "Purdue",         mascot: "Pete",             seed: 2,  region: "West", image: "images/pete.jpg" },
  { id: "gonzaga",        school: "Gonzaga",        mascot: "Spike",            seed: 3,  region: "West", image: "images/spike.jpg" },
  { id: "arkansas",       school: "Arkansas",       mascot: "The Razorback",    seed: 4,  region: "West", image: "images/razorback.jpg" },
  { id: "wisconsin",      school: "Wisconsin",      mascot: "Bucky",            seed: 5,  region: "West", image: "images/bucky.jpg" },
  { id: "byu",            school: "BYU",            mascot: "Cosmo",            seed: 6,  region: "West", image: "images/cosmo.jpg" },
  { id: "miami",          school: "Miami (FL)",     mascot: "Sebastian",        seed: 7,  region: "West", image: "images/sebastian.jpg" },
  { id: "villanova",      school: "Villanova",      mascot: "Will D. Cat",      seed: 8,  region: "West", image: "images/willdcat.jpg" },
  { id: "utah_state",     school: "Utah State",     mascot: "Big Blue",         seed: 9,  region: "West", image: "images/bigblue.jpg" },
  { id: "missouri",       school: "Missouri",       mascot: "Truman",           seed: 10, region: "West", image: "images/truman.jpg" },
  { id: "ff_w11",         school: "n/a",            mascot: "n/a",              seed: 11, region: "West", image: null },
  { id: "high_point",     school: "High Point",     mascot: "Prowler",          seed: 12, region: "West", image: "images/prowler.jpg" },
  { id: "hawaii",         school: "Hawaii",         mascot: "Rainbow Warriors", seed: 13, region: "West", image: "images/rainbowwarrior.jpg" },
  { id: "kennesaw_state", school: "Kennesaw State", mascot: "Scrappy",          seed: 14, region: "West", image: "images/scrappy.jpg" },
  { id: "queens",         school: "Queens",         mascot: "Rex",              seed: 15, region: "West", image: "images/rex.jpg" },
  { id: "long_island",    school: "Long Island",    mascot: "Finley",           seed: 16, region: "West", image: "images/finley.jpg" },

  /* ========== SOUTH ========= */
  { id: "florida",     school: "Florida",        mascot: "Albert",        seed: 1,  region: "South", image: "images/albert.jpg" },
  { id: "houston",     school: "Houston",        mascot: "Shasta",        seed: 2,  region: "South", image: "images/shasta.jpg" },
  { id: "illinois",    school: "Illinois",       mascot: "Kingfisher",    seed: 3,  region: "South", image: "images/kingfischer.jpg" },
  { id: "nebraska",    school: "Nebraska",       mascot: "Herbie",        seed: 4,  region: "South", image: "images/herbie.jpg" },
  { id: "vanderbilt",  school: "Vanderbilt",     mascot: "Mr. Commodore", seed: 5,  region: "South", image: "images/mrcommodore.jpg" },
  { id: "unc",         school: "North Carolina", mascot: "Rameses",       seed: 6,  region: "South", image: "images/rameses.jpg" },
  { id: "saint_marys", school: "Saint Mary's",   mascot: "Gael",          seed: 7,  region: "South", image: "images/gael.jpg" },
  { id: "clemson",     school: "Clemson",        mascot: "The Tiger",     seed: 8,  region: "South", image: "images/thetiger.jpg" },
  { id: "iowa",        school: "Iowa",           mascot: "Herky",         seed: 9,  region: "South", image: "images/herky.jpg" },
  { id: "texas_am",    school: "Texas A&M",      mascot: "Reveille",      seed: 10, region: "South", image: "images/reveille.jpg" },
  { id: "vcu",         school: "VCU",            mascot: "Rodney",        seed: 11, region: "South", image: "images/rodney.jpg" },
  { id: "mcneese_st",  school: "McNeese State",  mascot: "Rowdy",         seed: 12, region: "South", image: "images/rowdy.jpg" },
  { id: "troy",        school: "Troy",           mascot: "T-Roy",         seed: 13, region: "South", image: "images/troy.jpg" },
  { id: "penn",        school: "Penn",           mascot: "Willie",        seed: 14, region: "South", image: "images/willie.jpg" },
  { id: "idaho",       school: "Idaho",          mascot: "Joe Vandal",    seed: 15, region: "South", image: "images/joevandal.jpg" },
  { id: "ff_s16",      school: "n/a",            mascot: "n/a",           seed: 16, region: "South", image: null },


  /* ========= MIDWEST ======== */
  { id: "michigan",     school: "Michigan",        mascot: "Wolverine",             seed: 1,  region: "Midwest", image: "images/wolverine.jpg" },
  { id: "iowa_state",   school: "Iowa State",      mascot: "Cy",                    seed: 2,  region: "Midwest", image: "images/cy.jpg" },
  { id: "virginia",     school: "Virginia",        mascot: "The Cavalier",          seed: 3,  region: "Midwest", image: "images/cavalier.jpg" },
  { id: "alabama",      school: "Alabama",         mascot: "Big Al",                seed: 4,  region: "Midwest", image: "images/bigal.jpg" },
  { id: "texas_tech",   school: "Texas Tech",      mascot: "Raider Red",            seed: 5,  region: "Midwest", image: "images/raiderred.jpg" },
  { id: "tennessee",    school: "Tennessee",       mascot: "Smokey",                seed: 6,  region: "Midwest", image: "images/smokey.jpg" },
  { id: "kentucky",     school: "Kentucky",        mascot: "The Wildcat",           seed: 7,  region: "Midwest", image: "images/thewildcat.jpg" },
  { id: "georgia",      school: "Georgia",         mascot: "Hairy Dawg",            seed: 8,  region: "Midwest", image: "images/hairydawg.jpg" },
  { id: "st_louis",     school: "St. Louis",       mascot: "The Billiken",          seed: 9,  region: "Midwest", image: "images/billiken.jpg" },
  { id: "santa_clara",  school: "Santa Clara",     mascot: "Bucky",                 seed: 10, region: "Midwest", image: "images/buckybronco.jpg" },
  { id: "ff_mw11",      school: "n/a",             mascot: "n/a",                   seed: 11, region: "Midwest", image: null },
  { id: "akron",        school: "Akron",           mascot: "Zippy",                 seed: 12, region: "Midwest", image: "images/zippy.jpg" },
  { id: "hofstra",      school: "Hofstra",         mascot: "Kate and Willie Pride", seed: 13, region: "Midwest", image: "images/pride.jpg" },
  { id: "wright_state", school: "Wright State",    mascot: "Rowdy Raider",          seed: 14, region: "Midwest", image: "images/rowdyraider.jpg" },
  { id: "tennessee_st", school: "Tennessee State", mascot: "Aristocat",             seed: 15, region: "Midwest", image: "images/aristocat.jpg" },
  { id: "ff_mw16",      school: "n/a",             mascot: "n/a",                   seed: 16, region: "Midwest", image: null },
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

// ─── First Four Play-In Games ─────────────────────────────────────────────────
// 8 teams compete in 4 play-in games; winners earn a spot in the main bracket
const FIRST_FOUR_TEAMS = [
  { id: "texas",        school: "Texas",           mascot: "Hook 'Em",        seed: 11, region: "West",    image: "images/hookem.jpg" },
  { id: "nc_state",     school: "Nc State",        mascot: "Mr. and Ms. Wuf", seed: 11, region: "West",    image: "images/wuf.jpg" },
  { id: "prairie_view", school: "Prarie View A&M", mascot: "Panther",         seed: 16, region: "South",   image: "images/panther.jpg" },
  { id: "lehigh",       school: "Lehigh",          mascot: "Clutch",          seed: 16, region: "South",   image: "images/clutch.jpg" },
  { id: "umbc",         school: "UMBC",            mascot: "True Grit",       seed: 16, region: "Midwest", image: "images/truegrit.jpg" },
  { id: "howard",       school: "Howard",          mascot: "Bison",           seed: 16, region: "Midwest", image: "images/bison.jpg" },
  { id: "miami_oh",     school: "Miami-OH",        mascot: "Swoop",           seed: 11, region: "Midwest", image: "images/swoop.jpg" },
  { id: "smu",          school: "SMU",             mascot: "Peruna",          seed: 11, region: "Midwest", image: "images/peruna.jpg" },
];

// Each game: two teams compete, winner takes the specified spot in the main bracket
const FIRST_FOUR_GAMES = [
  { matchup: ["texas", "nc_state"],      replacesTeamId: "ff_w11",  region: "West",    seed: 11 },
  { matchup: ["prairie_view", "lehigh"], replacesTeamId: "ff_s16",  region: "South",   seed: 16 },
  { matchup: ["umbc", "howard"],         replacesTeamId: "ff_mw16", region: "Midwest", seed: 16 },
  { matchup: ["miami_oh", "smu"],        replacesTeamId: "ff_mw11", region: "Midwest", seed: 11 },
];

const FIRST_FOUR_MATCHUPS = FIRST_FOUR_GAMES.map(g => g.matchup);

// Helper: look up a team by id (searches main teams and First Four teams)
function getTeam(id) {
  return TEAMS.find(t => t.id === id) || FIRST_FOUR_TEAMS.find(t => t.id === id);
}
