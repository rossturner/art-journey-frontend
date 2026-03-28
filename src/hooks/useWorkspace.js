import {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {R2_BASE_URL} from '../config.js';

export default function useWorkspace() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${R2_BASE_URL}/workspace-index.json`)
            .then((r) => r.json())
            .then((raw) => {
                const blocks = raw
                    .map(({ year, month, projects }) => {
                        const enhanced = projects.map((p) => {
                            // real Date for sorting/formatting
                            const dateObj = new Date(year, month - 1, p.day || 1);
                            // strip leading “NN ” from title
                            const cleanTitle = p.title.replace(/^\d{1,2}\s+/, '').trim();

                            return {
                                ...p,
                                originalTitle: p.title,
                                title: cleanTitle,
                                date: dateObj,
                                dateLabel: format(dateObj, 'PPP'), // e.g. “Apr 1, 2025”
                            };
                        });

                        // newest first
                        enhanced.sort((a, b) => b.date - a.date);

                        return {
                            year,
                            month,
                            projects: enhanced,
                        };
                    })
                    // no empty months (should already be pruned server-side)
                    .filter((blk) => blk.projects.length)
                    // newest month first
                    .sort(
                        (a, b) =>
                            b.year - a.year ||
                            b.month - a.month
                    );

                setData(blocks);
            });
    }, []);

    return data;
}
