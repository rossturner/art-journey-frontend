# Cloudflare Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate art portfolio from IONOS (PHP + FTP) to Cloudflare Pages + R2 (static JSON + rclone).

**Architecture:** React SPA deployed to Cloudflare Pages at `ziedritz.art`. Artwork files served from Cloudflare R2 at `media.ziedritz.art`. A local Node sync script replaces the PHP backend — it scans the artwork directory, generates `workspace-index.json`, generates `events.ics`, and syncs everything to R2 via rclone.

**Tech Stack:** Node.js (sync script), Vite + React (frontend), rclone (R2 sync via S3-compatible API)

**Spec:** `docs/superpowers/specs/2026-03-28-cloudflare-migration-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/config.js` | Exports R2 base URL constant |
| Create | `scripts/sync.js` | Main sync entrypoint: generates index, generates ics, runs rclone |
| Create | `scripts/generate-workspace-index.js` | Scans artwork dir, outputs `workspace-index.json` |
| Create | `scripts/generate-events-ics.js` | Reads `events.json`, outputs `events.ics` |
| Modify | `src/hooks/useWorkspace.js` | Fetch URL → R2 |
| Modify | `src/pages/Project.jsx` | Image/video/clip URLs → R2 base URL prefix |
| Modify | `src/components/ProjectGallery.jsx` | Thumbnail URLs → R2 base URL prefix |
| Modify | `src/pages/ArtTrendsCalendar.jsx` | Calendar download link → `/static/events.ics` |
| Modify | `vite.config.js` | Remove `/workspace` proxy |
| Modify | `package.json` | Add `sync` script |
| Modify | `.gitignore` | Remove `scripts` entry, add `.env` |
| Delete | `workspace-index.php` | Replaced by `scripts/generate-workspace-index.js` |
| Delete | `public/static/events.php` | Replaced by `scripts/generate-events-ics.js` |

---

### Task 1: Add R2 base URL config

**Files:**
- Create: `src/config.js`

- [ ] **Step 1: Create config file**

```js
export const R2_BASE_URL = 'https://media.ziedritz.art';
```

- [ ] **Step 2: Commit**

```bash
git add src/config.js
git commit -m "feat: add R2 base URL config"
```

---

### Task 2: Update useWorkspace to fetch from R2

**Files:**
- Modify: `src/hooks/useWorkspace.js`

- [ ] **Step 1: Change fetch URL**

Change line 8 from:
```js
fetch('/workspace/workspace-index.php')
```
to:
```js
fetch(`${R2_BASE_URL}/workspace-index.json`)
```

Import `R2_BASE_URL` from `../config.js` at the top.

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useWorkspace.js
git commit -m "feat: fetch workspace index from R2 instead of PHP"
```

---

### Task 3: Update Project.jsx image URLs

**Files:**
- Modify: `src/pages/Project.jsx`

- [ ] **Step 1: Replace all `/workspace/` prefixes with R2 base URL**

Import `R2_BASE_URL` from `../config.js`.

Replace every occurrence of `` `/workspace/${...}` `` with `` `${R2_BASE_URL}/${...}` ``.

There are 10 occurrences across lines 50-145:
- Line 50: hero anchor href
- Line 54: hero image src
- Line 76: final anchor href
- Line 80: final image src
- Line 95: wip anchor href
- Line 99: wip image src
- Line 112: timelapse video src
- Line 128: reference anchor href
- Line 132: reference image src
- Line 145: clip download href

- [ ] **Step 2: Commit**

```bash
git add src/pages/Project.jsx
git commit -m "feat: serve project media from R2"
```

---

### Task 4: Update ProjectGallery.jsx thumbnail URLs

**Files:**
- Modify: `src/components/ProjectGallery.jsx`

- [ ] **Step 1: Replace thumbnail URL prefix**

Import `R2_BASE_URL` from `../config.js`.

Change line 81 from:
```jsx
src={`/workspace/${p.thumbnail}`}
```
to:
```jsx
src={`${R2_BASE_URL}/${p.thumbnail}`}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectGallery.jsx
git commit -m "feat: serve gallery thumbnails from R2"
```

---

### Task 5: Update ArtTrendsCalendar download link

**Files:**
- Modify: `src/pages/ArtTrendsCalendar.jsx`

- [ ] **Step 1: Change events.php link to events.ics**

Change line 29 from:
```jsx
<Text component="a" href="/static/events.php" td="underline" inherit>
```
to:
```jsx
<Text component="a" href="/static/events.ics" td="underline" inherit>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ArtTrendsCalendar.jsx
git commit -m "feat: link to static events.ics instead of PHP"
```

---

### Task 6: Fix .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Remove `scripts` from .gitignore**

The `.gitignore` currently has `scripts` on line 15 which would prevent the new `scripts/` directory from being tracked. Remove this line. `.env` is already gitignored (line 28).

Note: `public/static/events.ics` should NOT be gitignored — it must be committed so Cloudflare Pages can serve it.

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: allow scripts/ directory in git"
```

---

### Task 7: Remove Vite proxy and delete PHP files

**Files:**
- Modify: `vite.config.js`
- Delete: `workspace-index.php`
- Delete: `public/static/events.php`

- [ ] **Step 1: Simplify vite.config.js**

Remove the `server` block entirely. The file becomes:

```js
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 2: Delete PHP files**

```bash
rm workspace-index.php
rm public/static/events.php
```

- [ ] **Step 3: Commit**

```bash
git add vite.config.js
git rm workspace-index.php public/static/events.php
git commit -m "chore: remove PHP backend and Vite proxy"
```

---

### Task 8: Write workspace index generator

**Files:**
- Create: `scripts/generate-workspace-index.js`

- [ ] **Step 1: Create the script**

This script replicates the logic from `workspace-index.php`:

1. Read the workspace root directory (`/mnt/d/artwork/workspace/`)
2. Find directories matching `YYYY MM` pattern
3. For each month dir, scan project subdirectories
4. For each project, categorize files:
   - `final*.{png,jpg,jpeg,gif}` → finals array
   - `wip{N}*.{png,jpg,jpeg,gif}` → wips array, sorted by N ascending
   - `reference{N}*.{png,jpg,jpeg,gif}` → refs array, sorted by N ascending
   - `*.clip` → clips array
   - `timelapse*.mp4` → timelapse (first match or null)
   - `notes.txt` → read file content as string
5. Skip projects with no finals and no wips
6. Extract day from project dir name (two-digit number)
7. Generate slug: lowercase, strip non-word chars except spaces/hyphens, spaces to hyphens
8. Pick thumbnail: first final, or last wip as fallback
9. URL-encode path components: `encodeURIComponent("YYYY MM") + "/" + encodeURIComponent(projDir) + "/" + encodeURIComponent(filename)`
10. Sort projects by day descending, months by year/month descending
11. Write JSON to `{workspaceRoot}/workspace-index.json`

The workspace root should default to `/mnt/d/artwork/workspace/` but be overridable via a `WORKSPACE_ROOT` env var for flexibility.

```js
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || '/mnt/d/artwork/workspace';

function generateWorkspaceIndex() {
    const out = [];

    for (const ym of readdirSync(WORKSPACE_ROOT)) {
        if (!/^\d{4}\s\d{2}$/.test(ym)) continue;
        const [yearStr, monthStr] = ym.split(' ');
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        const monthDir = join(WORKSPACE_ROOT, ym);

        const monthBlock = { year, month, projects: [] };

        for (const proj of readdirSync(monthDir)) {
            if (proj.startsWith('.')) continue;
            const projDir = join(monthDir, proj);
            if (!statSync(projDir).isDirectory()) continue;

            const files = readdirSync(projDir).filter(f => !f.startsWith('.'));

            const finals = files.filter(f => /^final.*\.(png|jpe?g|gif)$/i.test(f));

            const wips = files
                .filter(f => /^wip(\d+).*?\.(png|jpe?g|gif)$/i.test(f))
                .sort((a, b) => {
                    const na = parseInt(a.match(/wip(\d+)/i)[1], 10);
                    const nb = parseInt(b.match(/wip(\d+)/i)[1], 10);
                    return na - nb;
                });

            const refs = files
                .filter(f => /^reference(\d+).*?\.(png|jpe?g|gif)$/i.test(f))
                .sort((a, b) => {
                    const na = parseInt(a.match(/reference(\d+)/i)[1], 10);
                    const nb = parseInt(b.match(/reference(\d+)/i)[1], 10);
                    return na - nb;
                });

            const clips = files.filter(f => /\.clip$/i.test(f));
            const timelapseFile = files.find(f => /^timelapse.*\.mp4$/i.test(f)) || null;

            if (finals.length === 0 && wips.length === 0) continue;

            const dayMatch = proj.match(/\b(\d{2})\b/);
            const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;

            const slug = proj
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');

            const enc = (s) => encodeURIComponent(s);
            const mapPath = (f) => `${enc(ym)}/${enc(proj)}/${enc(f)}`;

            const thumb = finals.length > 0 ? finals[0] : wips[wips.length - 1];

            let notes = null;
            const notesPath = join(projDir, 'notes.txt');
            try {
                notes = readFileSync(notesPath, 'utf8');
            } catch {}

            monthBlock.projects.push({
                title: proj,
                slug,
                day,
                thumbnail: mapPath(thumb),
                final: finals.map(mapPath),
                wip: wips.map(mapPath),
                reference: refs.map(mapPath),
                clip: clips.map(mapPath),
                timelapse: timelapseFile ? mapPath(timelapseFile) : null,
                notes,
            });
        }

        monthBlock.projects.sort((a, b) => b.day - a.day);
        if (monthBlock.projects.length > 0) out.push(monthBlock);
    }

    out.sort((a, b) => b.year - a.year || b.month - a.month);

    const outPath = join(WORKSPACE_ROOT, 'workspace-index.json');
    writeFileSync(outPath, JSON.stringify(out));
    console.log(`Wrote ${outPath} (${out.length} months, ${out.reduce((s, m) => s + m.projects.length, 0)} projects)`);
}

export { generateWorkspaceIndex };
```

- [ ] **Step 2: Test by running it directly**

```bash
node -e "import('./scripts/generate-workspace-index.js').then(m => m.generateWorkspaceIndex())"
```

Expected: prints something like `Wrote /mnt/d/artwork/workspace/workspace-index.json (13 months, 47 projects)`.

Verify the JSON is valid and matches the structure the frontend expects:

```bash
node -e "const d=JSON.parse(require('fs').readFileSync('/mnt/d/artwork/workspace/workspace-index.json','utf8')); console.log('months:', d.length); console.log('first project:', JSON.stringify(d[0].projects[0], null, 2))"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/generate-workspace-index.js
git commit -m "feat: add workspace index generator script"
```

---

### Task 9: Write events.ics generator

**Files:**
- Create: `scripts/generate-events-ics.js`

- [ ] **Step 1: Create the script**

Replicates `public/static/events.php` logic:

1. Read `public/static/events.json`
2. Filter to events where `rules` starts with "Fixed"
3. Generate VCALENDAR output with FREQ=YEARLY recurrence
4. Use deterministic UIDs: hash of `title + month + startDay` + `@ziedritz.art`
5. Use current year for DTSTART
6. Escape per RFC 5545: commas, semicolons, newlines
7. Write to `public/static/events.ics`

```js
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATIC_DIR = join(__dirname, '..', 'public', 'static');

function generateEventsIcs() {
    const events = JSON.parse(readFileSync(join(STATIC_DIR, 'events.json'), 'utf8'));
    const year = new Date().getFullYear();

    const esc = (s) => s.replace(/[,;]/g, (m) => '\\' + m).replace(/\n/g, '\\n').replace(/\r/g, '');

    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//ziedritz.art//Art Trends Calendar//EN',
        'CALSCALE:GREGORIAN',
    ];

    for (const ev of events) {
        if (!ev.rules.startsWith('Fixed')) continue;

        const dtstart = `${year}${ev.month}${ev.startDay}`;
        const dtendDate = new Date(year, parseInt(ev.month, 10) - 1, parseInt(ev.startDay, 10) + 1);
        const dtend = dtendDate.getFullYear().toString() +
            String(dtendDate.getMonth() + 1).padStart(2, '0') +
            String(dtendDate.getDate()).padStart(2, '0');

        const rrule = `FREQ=YEARLY;BYMONTH=${parseInt(ev.month, 10)};BYMONTHDAY=${parseInt(ev.startDay, 10)}`;

        const descParts = [ev.summary, ev.jpHashtag, ev.enHashtag].filter(Boolean);
        const description = descParts.join(' ');

        const uid = createHash('sha256')
            .update(`${ev.title}-${ev.month}-${ev.startDay}`)
            .digest('hex')
            .slice(0, 16);

        lines.push(
            'BEGIN:VEVENT',
            `UID:${uid}@ziedritz.art`,
            `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
            `DTSTART;VALUE=DATE:${dtstart}`,
            `DTEND;VALUE=DATE:${dtend}`,
            `RRULE:${rrule}`,
            `SUMMARY:${esc(ev.title)}`,
            `DESCRIPTION:${esc(description)}`,
            'END:VEVENT',
        );
    }

    lines.push('END:VCALENDAR');

    const outPath = join(STATIC_DIR, 'events.ics');
    writeFileSync(outPath, lines.join('\r\n') + '\r\n');
    console.log(`Wrote ${outPath} (${lines.filter(l => l === 'BEGIN:VEVENT').length} events)`);
}

export { generateEventsIcs };
```

- [ ] **Step 2: Test by running it**

```bash
node -e "import('./scripts/generate-events-ics.js').then(m => m.generateEventsIcs())"
```

Expected: prints something like `Wrote .../public/static/events.ics (N events)`.

Verify the file starts with `BEGIN:VCALENDAR` and contains `BEGIN:VEVENT` entries:

```bash
head -20 public/static/events.ics
```

- [ ] **Step 3: Commit**

```bash
git add scripts/generate-events-ics.js
git commit -m "feat: add events.ics generator script"
```

---

### Task 10: Write sync entrypoint and add npm script

**Files:**
- Create: `scripts/sync.js`
- Modify: `package.json`

- [ ] **Step 1: Create sync.js**

Orchestrates all three steps: generate index, generate ics, rclone sync.

```js
import { generateWorkspaceIndex } from './generate-workspace-index.js';
import { generateEventsIcs } from './generate-events-ics.js';
import { execSync } from 'node:child_process';

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || '/mnt/d/artwork/workspace';
const R2_BUCKET = process.env.R2_BUCKET || 'r2:art-journey';

console.log('=== Step 1: Generate workspace-index.json ===');
generateWorkspaceIndex();

console.log('\n=== Step 2: Generate events.ics ===');
generateEventsIcs();

console.log('\n=== Step 3: Sync to R2 ===');
const rcloneExe = process.env.RCLONE || 'rclone.exe';
const rcloneCmd = `${rcloneExe} sync "${WORKSPACE_ROOT}" ${R2_BUCKET} --progress`;
console.log(`Running: ${rcloneCmd}`);
execSync(rcloneCmd, { stdio: 'inherit' });

console.log('\nSync complete.');
```

- [ ] **Step 2: Add npm script to package.json**

Add to the `"scripts"` section:

```json
"sync": "node scripts/sync.js"
```

- [ ] **Step 3: Test the full sync**

```bash
npm run sync
```

Expected: generates workspace-index.json, generates events.ics, syncs files to R2. Verify by fetching from R2:

```bash
curl -s "https://media.ziedritz.art/workspace-index.json" | head -c 200
```

- [ ] **Step 4: Commit**

```bash
git add scripts/sync.js package.json
git commit -m "feat: add npm run sync entrypoint for R2 deployment"
```

---

### Task 11: End-to-end verification

- [ ] **Step 1: Run `npm run sync` and verify R2 has the workspace index**

```bash
npm run sync
curl -s "https://media.ziedritz.art/workspace-index.json" | node -e "process.stdin.on('data',d=>{const j=JSON.parse(d);console.log(j.length,'months',j.reduce((s,m)=>s+m.projects.length,0),'projects')})"
```

- [ ] **Step 2: Verify an artwork image is accessible**

Pick a thumbnail URL from the JSON and curl it:

```bash
curl -s -o /dev/null -w "%{http_code}" "https://media.ziedritz.art/$(node -e "const d=JSON.parse(require('fs').readFileSync('/mnt/d/artwork/workspace/workspace-index.json','utf8'));console.log(d[0].projects[0].thumbnail)")"
```

Expected: 200

- [ ] **Step 3: Run `npm run dev` and verify the site works locally**

```bash
npm run dev
```

Open `http://localhost:5173` in browser. Verify:
- Gallery loads with thumbnails from R2
- Clicking a project shows the detail page with images from R2
- Art Trends Calendar page loads, download link points to `.ics`
- Aspirations and Daily Tracker pages are unaffected

- [ ] **Step 4: Build and verify production build**

```bash
npm run build && npm run preview
```

Open the preview URL and verify the same.

- [ ] **Step 5: Commit all remaining changes and push**

```bash
git push
```

This triggers a Cloudflare Pages auto-deploy. Verify `https://ziedritz.art` serves the updated site.
