import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATIC_DIR = join(__dirname, '..', 'public', 'static');

function generateEventsIcs() {
    const events = JSON.parse(readFileSync(join(STATIC_DIR, 'events.json'), 'utf8'));
    const year = new Date().getFullYear();
    const dtstamp = `${year}0101T000000Z`;

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
            `DTSTAMP:${dtstamp}`,
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
