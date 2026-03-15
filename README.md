# 🏀 March Mascot Madness

A bracket picker where you see **one matchup at a time**, teams are shown by **mascot only** (no seeds, no team names visible), and your progress is saved locally so you can pick up where you left off.

## Files

```
march-madness/
├── index.html    ← the app
├── style.css     ← all styles
├── app.js        ← all logic (matchup flow, picks, UI)
├── bracket.js    ← bracket data (edit this every year)
└── images/       ← put mascot images here (optional)
```

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `march-madness`)
2. Upload all files into the repo root
3. Go to **Settings → Pages → Source → main branch / root**
4. Your site is live at `https://yourusername.github.io/march-madness/`

---

## Adding Real Mascot Images

1. Drop your PNG/JPG files into an `images/` folder
2. In `bracket.js`, set the `image` field for each team:

```js
{ id: "auburn", school: "Auburn", mascot: "Tigers", seed: 1, region: "South",
  image: "images/auburn-tiger.png" },
```

Good free sources:
- [Wikipedia Commons](https://commons.wikimedia.org) — search "[school] Aubie mascot"
- School athletics websites (check license)
- [SportsLogos.net](https://sportslogos.net) for reference

---

## Update for a New Year

Edit `bracket.js` only — you do not need to touch `app.js` or `index.html`.

1. Update `TOURNAMENT_YEAR` (this clears old saved picks automatically)
2. Update the `TEAMS` array with this year's 64 teams
3. Update `FIRST_ROUND_MATCHUPS` with the correct first-round pairings

The matchup format is `["higherSeedTeamId", "lowerSeedTeamId"]` — order determines which card appears on the left vs right. 

---

## How Rounds Work

The app builds each round automatically from your picks:
- **Round 1** (32 games): uses `FIRST_ROUND_MATCHUPS` directly
- **Round 2–6**: winners from consecutive pairs of previous-round games advance
  - e.g. Winner of game 1 plays winner of game 2, winner of game 3 plays game 4, etc.

This means the order in `FIRST_ROUND_MATCHUPS` determines bracket path. The current order follows the standard NCAA bracket: South region (games 1–8), East (9–16), Midwest (17–24), West (25–32).

---

## LocalStorage

Picks are saved under key `mmm_YEAR_state` in localStorage. Changing `TOURNAMENT_YEAR` automatically starts fresh for everyone.
