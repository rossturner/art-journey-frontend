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

            const finals = files.filter(f => /final.*\.(png|jpe?g|gif)$/i.test(f));

            const wips = files
                .filter(f => /wip(\d+).*?\.(png|jpe?g|gif)$/i.test(f))
                .sort((a, b) => {
                    const na = parseInt(a.match(/wip(\d+)/i)[1], 10);
                    const nb = parseInt(b.match(/wip(\d+)/i)[1], 10);
                    return na - nb;
                });

            const refs = files
                .filter(f => /reference(\d+).*?\.(png|jpe?g|gif)$/i.test(f))
                .sort((a, b) => {
                    const na = parseInt(a.match(/reference(\d+)/i)[1], 10);
                    const nb = parseInt(b.match(/reference(\d+)/i)[1], 10);
                    return na - nb;
                });

            const clips = files.filter(f => /\.clip$/i.test(f));
            const timelapseFile = files.find(f => /timelapse.*\.mp4$/i.test(f)) || null;

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
