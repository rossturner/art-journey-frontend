# Migration from IONOS to Cloudflare Pages + R2

## Context

The art portfolio site at `ziedritz.art` is currently hosted on IONOS. The introductory hosting rate is expiring. The site consists of:

- A React SPA (Vite + Mantine + React Router) serving a gallery, aspirations page, art trends calendar, and daily tracker
- A PHP backend (`workspace-index.php`) that scans artwork directories and returns JSON metadata
- ~2.2 GB of artwork files (images, videos, .clip files) across 47 projects in 13 monthly folders, growing ~200 MB/month
- Content synced from local machine to IONOS via rclone over FTP
- A PHP script (`events.php`) that generates an iCalendar (.ics) file from `events.json`

## Goal

Migrate to Cloudflare Pages + R2 for $0/month hosting within free tier limits.

## Architecture

### Two-part hosting

- **Cloudflare Pages** at `ziedritz.art` — serves the React SPA
- **Cloudflare R2** at `media.ziedritz.art` — serves artwork files and the generated workspace index

### PHP elimination

- `workspace-index.php` is replaced by a local Node script that scans `/mnt/d/artwork/workspace/`, produces `workspace-index.json`, and uploads it to R2 alongside the artwork files. The PHP file is deleted from the workspace.
- `events.php` is replaced by a local script that generates a static `events.ics` from `events.json`. The .ics file is included in the Pages build. Both `workspace-index.php` and `public/static/events.php` are deleted from the project.

## R2 Bucket Structure

Single public R2 bucket (`art-journey`) mirroring the local workspace directory:

```
r2:art-journey/
├── workspace-index.json
├── 2024 09/
│   ├── project-name 01/
│   │   ├── final.png
│   │   ├── wip1.png
│   │   ├── reference1.jpg
│   │   ├── timelapse.mp4
│   │   └── notes.txt
│   └── ...
├── 2024 10/
│   └── ...
└── ...
```

CORS configured on the bucket to allow `GET` requests from `https://ziedritz.art` (and `http://localhost:*` for local development). R2 will correctly decode URL-encoded paths (e.g., `2024%2009/` resolves to the `2024 09/` key).

## Local Sync Script

A Node script at `scripts/sync.js`, invoked via `npm run sync`, that performs three steps:

### 1. Generate `workspace-index.json`

Scans `/mnt/d/artwork/workspace/` using the same logic as the current PHP:
- Reads `YYYY MM/` directories for year/month grouping
- Within each month, reads project subdirectories
- Categorizes files by pattern: `final*`, `wip\d+*`, `reference\d+*`, `.clip`, `timelapse*.mp4`
- Reads `notes.txt` content and embeds it as a `notes` string field in the project object (the frontend renders this inline, not as a file URL)
- Extracts day from project directory name
- Generates slugs from titles
- Picks thumbnail (first final image, or last WIP as fallback)
- URL-encodes file paths
- Sorts projects by day (newest first), months by year/month (newest first)
- Outputs JSON in the same structure the frontend already consumes
- Writes to `/mnt/d/artwork/workspace/workspace-index.json`

### 2. Generate `events.ics`

- Reads `public/static/events.json`
- Filters to "Fixed" annual events
- Generates VCALENDAR format with FREQ=YEARLY recurrence, using the current year for DTSTART
- Uses deterministic UIDs (hash of event title + date) so re-importing updates rather than duplicates entries
- Escapes special characters per RFC 5545
- Writes to `public/static/events.ics`
- Note: this modifies the Pages source tree, so a git commit + push is needed if events changed

### 3. Sync to R2

- Shells out to `rclone sync /mnt/d/artwork/workspace/ r2:art-journey/`
- Pushes artwork files and `workspace-index.json` to R2
- Note: `rclone sync` is destructive (deletes remote files not present locally). Consider `--dry-run` for verification before first sync.

## Frontend Changes

### `useWorkspace.js`
- Fetch URL changes from `/workspace/workspace-index.php` to `https://media.ziedritz.art/workspace-index.json`
- No processing logic changes — response format is identical

### `Project.jsx`
- Image, video, and .clip file URLs prefixed with R2 base URL instead of resolving relative to `/workspace/`

### `ProjectGallery.jsx`
- Thumbnail URLs prefixed with R2 base URL

### `ArtTrendsCalendar.jsx`
- Calendar download link changes from `/static/events.php` to `/static/events.ics`

### `vite.config.js`
- Remove the `/workspace` proxy configuration entirely

### Shared config
- R2 base URL (`https://media.ziedritz.art/`) stored as a single constant or environment variable

### No changes needed
- **Daily tracker**: Fetches from Google Sheets, unaffected by migration
- **Aspirations page**: Uses local static images in `public/static/aspirations/`, served by Pages
- **SPA routing**: Uses HashRouter, works automatically on Cloudflare Pages with no `_redirects` file needed

## Cloudflare Setup

### DNS
- Add `ziedritz.art` to Cloudflare DNS (free plan)
- `ziedritz.art` → Cloudflare Pages (configured automatically via Pages custom domain)
- `media.ziedritz.art` → R2 bucket (configured automatically via R2 custom domain)

### R2 Bucket
- Create bucket `art-journey`
- Enable public access
- Attach custom domain `media.ziedritz.art`
- Configure CORS: allow `GET` from `https://ziedritz.art` and `http://localhost:*`

### Pages Project
- Connect GitHub repo to Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Auto-deploys on push to `master`

### rclone Configuration
- Configure rclone R2 remote using S3-compatible endpoint with Cloudflare API tokens

## Deployment Workflow

Two independent operations:

1. **Code changes**: Push to `master` → Cloudflare Pages auto-deploys the SPA
2. **Artwork changes**: Run `npm run sync` → generates index JSON, generates events.ics, syncs files to R2

These are decoupled — artwork can be updated without redeploying the SPA and vice versa. The one exception is if `events.json` changes: since `npm run sync` generates `events.ics` into the Pages source tree, a git commit + push is needed to deploy the updated calendar file.

## Cost

- Cloudflare Pages free tier: unlimited bandwidth, 500 builds/month
- Cloudflare R2 free tier: 10 GB storage, 10M Class B reads/month, zero egress fees
- At current 2.2 GB with ~200 MB/month growth, free tier covers ~3+ years
- Beyond 10 GB: $0.015/GB/month (e.g., 15 GB = $0.075/month)

**Projected cost: $0/month** for the foreseeable future.
