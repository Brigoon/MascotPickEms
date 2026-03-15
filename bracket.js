// 2025 NCAA Tournament Bracket Data
// To update for a new year: edit the teams below and update TOURNAMENT_YEAR
// Seeds are stored here but never shown to the user

const TOURNAMENT_YEAR = 2025;

// Each team: { id, school, mascot, seed, region, image }
// image: path to mascot image (e.g. "images/tiger.png") or null for placeholder
const TEAMS = [
  // ===== SOUTH REGION =====
  { id: "auburn",        school: "Auburn",        mascot: "Tigers",        seed: 1,  region: "South", image: null },
  { id: "michigan_st",   school: "Michigan State", mascot: "Spartans",      seed: 2,  region: "South", image: null },
  { id: "iowa_state",    school: "Iowa State",     mascot: "Cyclones",      seed: 3,  region: "South", image: null },
  { id: "texas_am",      school: "Texas A&M",      mascot: "Aggies",        seed: 4,  region: "South", image: null },
  { id: "michigan",      school: "Michigan",       mascot: "Wolverines",    seed: 5,  region: "South", image: null },
  { id: "ole_miss",      school: "Ole Miss",       mascot: "Rebels",        seed: 6,  region: "South", image: null },
  { id: "marquette",     school: "Marquette",      mascot: "Golden Eagles", seed: 7,  region: "South", image: null },
  { id: "louisville",    school: "Louisville",     mascot: "Cardinals",     seed: 8,  region: "South", image: null },
  { id: "creighton",     school: "Creighton",      mascot: "Bluejays",      seed: 9,  region: "South", image: null },
  { id: "new_mexico",    school: "New Mexico",     mascot: "Lobos",         seed: 10, region: "South", image: null },
  { id: "nc_state",      school: "NC State",       mascot: "Wolfpack",      seed: 11, region: "South", image: null },
  { id: "ucsd",          school: "UC San Diego",   mascot: "Tritons",       seed: 12, region: "South", image: null },
  { id: "yale",          school: "Yale",           mascot: "Bulldogs",      seed: 13, region: "South", image: null },
  { id: "lipscomb",      school: "Lipscomb",       mascot: "Bisons",        seed: 14, region: "South", image: null },
  { id: "bryant",        school: "Bryant",         mascot: "Bulldogs",      seed: 15, region: "South", image: null },
  { id: "alabama_st",    school: "Alabama State",  mascot: "Hornets",       seed: 16, region: "South", image: null },

  // ===== EAST REGION =====
  { id: "duke",          school: "Duke",           mascot: "Blue Devils",   seed: 1,  region: "East", image: null },
  { id: "alabama",       school: "Alabama",        mascot: "Crimson Tide",  seed: 2,  region: "East", image: null },
  { id: "wisconsin",     school: "Wisconsin",      mascot: "Badgers",       seed: 3,  region: "East", image: null },
  { id: "arizona",       school: "Arizona",        mascot: "Wildcats",      seed: 4,  region: "East", image: null },
  { id: "oregon",        school: "Oregon",         mascot: "Ducks",         seed: 5,  region: "East", image: null },
  { id: "byu",           school: "BYU",            mascot: "Cougars",       seed: 6,  region: "East", image: null },
  { id: "saint_marys",   school: "Saint Mary's",   mascot: "Gaels",         seed: 7,  region: "East", image: null },
  { id: "miss_state",    school: "Mississippi St", mascot: "Bulldogs",      seed: 8,  region: "East", image: null },
  { id: "baylor",        school: "Baylor",         mascot: "Bears",         seed: 9,  region: "East", image: null },
  { id: "vanderbilt",    school: "Vanderbilt",     mascot: "Commodores",    seed: 10, region: "East", image: null },
  { id: "vcu",           school: "VCU",            mascot: "Rams",          seed: 11, region: "East", image: null },
  { id: "liberty",       school: "Liberty",        mascot: "Flames",        seed: 12, region: "East", image: null },
  { id: "akron",         school: "Akron",          mascot: "Zips",          seed: 13, region: "East", image: null },
  { id: "montana",       school: "Montana",        mascot: "Grizzlies",     seed: 14, region: "East", image: null },
  { id: "robert_morris", school: "Robert Morris",  mascot: "Colonials",     seed: 15, region: "East", image: null },
  { id: "mount_st_marys",school: "Mount St. Mary's",mascot:"Mountaineers",  seed: 16, region: "East", image: null },

  // ===== MIDWEST REGION =====
  { id: "houston",       school: "Houston",        mascot: "Cougars",       seed: 1,  region: "Midwest", image: null },
  { id: "tennessee",     school: "Tennessee",      mascot: "Volunteers",    seed: 2,  region: "Midwest", image: null },
  { id: "kentucky",      school: "Kentucky",       mascot: "Wildcats",      seed: 3,  region: "Midwest", image: null },
  { id: "purdue",        school: "Purdue",         mascot: "Boilermakers",  seed: 4,  region: "Midwest", image: null },
  { id: "clemson",       school: "Clemson",        mascot: "Tigers",        seed: 5,  region: "Midwest", image: null },
  { id: "illinois",      school: "Illinois",       mascot: "Illini",        seed: 6,  region: "Midwest", image: null },
  { id: "ucla",          school: "UCLA",           mascot: "Bruins",        seed: 7,  region: "Midwest", image: null },
  { id: "gonzaga",       school: "Gonzaga",        mascot: "Bulldogs",      seed: 8,  region: "Midwest", image: null },
  { id: "georgia",       school: "Georgia",        mascot: "Bulldogs",      seed: 9,  region: "Midwest", image: null },
  { id: "utah_state",    school: "Utah State",     mascot: "Aggies",        seed: 10, region: "Midwest", image: null },
  { id: "xavier_win",    school: "Xavier",         mascot: "Musketeers",    seed: 11, region: "Midwest", image: null },
  { id: "mcneese",       school: "McNeese State",  mascot: "Cowboys",       seed: 12, region: "Midwest", image: null },
  { id: "high_point",    school: "High Point",     mascot: "Panthers",      seed: 13, region: "Midwest", image: null },
  { id: "troy",          school: "Troy",           mascot: "Trojans",       seed: 14, region: "Midwest", image: null },
  { id: "wofford",       school: "Wofford",        mascot: "Terriers",      seed: 15, region: "Midwest", image: null },
  { id: "siue",          school: "SIU Edwardsville",mascot:"Cougars",       seed: 16, region: "Midwest", image: null },

  // ===== WEST REGION =====
  { id: "florida",       school: "Florida",        mascot: "Gators",        seed: 1,  region: "West", image: null },
  { id: "st_johns",      school: "St. John's",     mascot: "Red Storm",     seed: 2,  region: "West", image: null },
  { id: "texas_tech",    school: "Texas Tech",     mascot: "Red Raiders",   seed: 3,  region: "West", image: null },
  { id: "maryland",      school: "Maryland",       mascot: "Terrapins",     seed: 4,  region: "West", image: null },
  { id: "memphis",       school: "Memphis",        mascot: "Tigers",        seed: 5,  region: "West", image: null },
  { id: "missouri",      school: "Missouri",       mascot: "Tigers",        seed: 6,  region: "West", image: null },
  { id: "kansas",        school: "Kansas",         mascot: "Jayhawks",      seed: 7,  region: "West", image: null },
  { id: "uconn",         school: "UConn",          mascot: "Huskies",       seed: 8,  region: "West", image: null },
  { id: "oklahoma",      school: "Oklahoma",       mascot: "Sooners",       seed: 9,  region: "West", image: null },
  { id: "arkansas",      school: "Arkansas",       mascot: "Razorbacks",    seed: 10, region: "West", image: null },
  { id: "drake",         school: "Drake",          mascot: "Bulldogs",      seed: 11, region: "West", image: null },
  { id: "colorado_st",   school: "Colorado State", mascot: "Rams",          seed: 12, region: "West", image: null },
  { id: "grand_canyon",  school: "Grand Canyon",   mascot: "Antelopes",     seed: 13, region: "West", image: null },
  { id: "unc_wilmington",school: "UNC Wilmington", mascot: "Seahawks",      seed: 14, region: "West", image: null },
  { id: "omaha",         school: "Omaha",          mascot: "Mavericks",     seed: 15, region: "West", image: null },
  { id: "norfolk_state", school: "Norfolk State",  mascot: "Spartans",      seed: 16, region: "West", image: null },
];

// First-round matchups: [higherSeedId, lowerSeedId]
// Standard bracket format: 1v16, 8v9, 5v12, 4v13, 6v11, 3v14, 7v10, 2v15
const FIRST_ROUND_MATCHUPS = [
  // SOUTH
  ["auburn",       "alabama_st"],
  ["louisville",   "creighton"],
  ["michigan",     "ucsd"],
  ["texas_am",     "yale"],
  ["ole_miss",     "nc_state"],
  ["iowa_state",   "lipscomb"],
  ["marquette",    "new_mexico"],
  ["michigan_st",  "bryant"],

  // EAST
  ["duke",         "mount_st_marys"],
  ["miss_state",   "baylor"],
  ["oregon",       "liberty"],
  ["arizona",      "akron"],
  ["byu",          "vcu"],
  ["wisconsin",    "montana"],
  ["saint_marys",  "vanderbilt"],
  ["alabama",      "robert_morris"],

  // MIDWEST
  ["houston",      "siue"],
  ["gonzaga",      "georgia"],
  ["clemson",      "mcneese"],
  ["purdue",       "high_point"],
  ["illinois",     "xavier_win"],
  ["kentucky",     "troy"],
  ["ucla",         "utah_state"],
  ["tennessee",    "wofford"],

  // WEST
  ["florida",      "norfolk_state"],
  ["uconn",        "oklahoma"],
  ["memphis",      "colorado_st"],
  ["maryland",     "grand_canyon"],
  ["missouri",     "drake"],
  ["texas_tech",   "unc_wilmington"],
  ["kansas",       "arkansas"],
  ["st_johns",     "omaha"],
];

// Helper: look up a team by id
function getTeam(id) {
  return TEAMS.find(t => t.id === id);
}
