<?php
header('Content-Type: application/json');

$root = __DIR__;                        // script lives inside workspace/
$out  = [];

foreach (scandir($root) as $ym) {
    if (!preg_match('/^\d{4}\s\d{2}$/', $ym)) continue;
    [$year, $month] = explode(' ', $ym);

    $monthBlock = [
        'year'     => (int) $year,
        'month'    => (int) $month,
        'projects' => [],
    ];

    foreach (scandir("$root/$ym") as $proj) {
        if ($proj[0] === '.') continue;
        $projDir = "$root/$ym/$proj";
        if (!is_dir($projDir)) continue;

        /* ---------- gather files ---------- */
        $files      = array_values(array_filter(scandir($projDir), fn($f) => $f[0] !== '.'));
        $finals     = preg_grep('/final.*\.(png|jpe?g|gif)$/i', $files);
        $wips       = preg_grep('/wip(\d+).*?\.(png|jpe?g|gif)$/i', $files);
        usort($wips, fn($a, $b) =>
            (int)preg_replace('/.*wip(\d+).*/i', '$1', $a)
           <=>
            (int)preg_replace('/.*wip(\d+).*/i', '$1', $b)
        );
        $clips      = preg_grep('/\.clip$/i', $files);
        $timelapse  = preg_grep('/timelapse.*\.mp4$/i', $files);

        /* skip empty projects */
        if (empty($finals) && empty($wips)) continue;

        /* ---------- derive metadata ---------- */
        preg_match('/\b(\d{2})\b/', $proj, $m);
        $day  = isset($m[1]) ? (int)$m[1] : 1;

        $slug = strtolower($proj);
        $slug = preg_replace('/[^\w\s-]/', '', $slug);
        $slug = preg_replace('/\s+/', '-', $slug);

        $enc      = fn($s) => rawurlencode($s);
        $mapPath  = fn($f) => $enc("$year $month") . '/' . $enc($proj) . '/' . $enc($f);
        $thumb    = !empty($finals) ? reset($finals) : end($wips);

        /* ---------- notes.txt (optional) ---------- */
        $notesPath = "$projDir/notes.txt";
        $notes     = is_file($notesPath)
            ? file_get_contents($notesPath)     // read whole file into string :contentReference[oaicite:1]{index=1}
            : null;

        /* ---------- assemble project block ---------- */
        $monthBlock['projects'][] = [
            'title'     => $proj,
            'slug'      => $slug,
            'day'       => $day,
            'thumbnail' => $mapPath($thumb),
            'final'     => array_values(array_map($mapPath, $finals)),
            'wip'       => array_values(array_map($mapPath, $wips)),
            'clip'      => array_values(array_map($mapPath, $clips)),
            'timelapse' => $timelapse ? $mapPath(reset($timelapse)) : null,
            'notes'     => $notes,              // ← new field
        ];
    }

    usort($monthBlock['projects'], fn($a, $b) => $b['day'] <=> $a['day']);
    if ($monthBlock['projects']) $out[] = $monthBlock;
}

usort($out, fn($a, $b) =>
    $b['year'] <=> $a['year'] ?: $b['month'] <=> $a['month']
);

echo json_encode($out, JSON_UNESCAPED_SLASHES);
