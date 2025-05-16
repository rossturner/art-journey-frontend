<?php
header('Content-Type: application/json');

$root = __DIR__;
$out  = [];

foreach (scandir($root) as $ym) {
    if (!preg_match('/^\d{4}\s\d{2}$/', $ym)) continue;
    list($year, $month) = explode(' ', $ym);

    $monthBlock = [
        'year'     => (int) $year,
        'month'    => (int) $month,
        'projects' => [],
    ];

    foreach (scandir("$root/$ym") as $proj) {
        if ($proj[0] === '.') continue;
        $projDir = "$root/$ym/$proj";
        if (!is_dir($projDir)) continue;

        // list and filter files
        $files = array_values(array_filter(scandir($projDir), fn($f) => $f[0] !== '.'));

        // collect finals, wips, clips, timelapse
        $finals = preg_grep('/final.*\.(png|jpe?g|gif)$/i', $files);
        $wips   = preg_grep('/wip(\d+).*?\.(png|jpe?g|gif)$/i', $files);
        usort($wips, fn($a, $b) =>
            (int)preg_replace('/.*wip(\d+).*/i', '$1', $a)
            <=>
            (int)preg_replace('/.*wip(\d+).*/i', '$1', $b)
        );
        $clips     = preg_grep('/\.clip$/i', $files);
        $timelapse = preg_grep('/timelapse.*\.mp4$/i', $files);

        if (empty($finals) && empty($wips)) {
            continue; // skip if nothing to show
        }

        // determine project date
        preg_match('/\b(\d{2})\b/', $proj, $m);
        $day = isset($m[1]) ? (int)$m[1] : 1;

        // build slug from title
        $slug = strtolower($proj);
        $slug = preg_replace('/[^\w\s-]/', '', $slug);
        $slug = preg_replace('/\s+/', '-', $slug);

        // helper to encode a path segment
        $enc = fn($s) => rawurlencode($s);

        // map filenames to URL-encoded paths
        $mapPath = fn($f) =>
            $enc($year.' '.$month).'/'
          . $enc($proj).'/'
          . $enc($f);

        // choose thumbnail: first final, else last WIP
        $thumbFile = !empty($finals)
            ? reset($finals)
            : end($wips);

        $monthBlock['projects'][] = [
            'title'     => $proj,
            'slug'      => $slug,
            'day'       => $day,
            'thumbnail' => $mapPath($thumbFile),
            'final'     => array_values(array_map($mapPath, $finals)),
            'wip'       => array_values(array_map($mapPath, $wips)),
            'clip'      => array_values(array_map($mapPath, $clips)),
            'timelapse' => $timelapse
                ? $mapPath(reset($timelapse))
                : null,
        ];
    }

    // sort projects newest-to-oldest within month
    usort($monthBlock['projects'], fn($a, $b) => $b['day'] <=> $a['day']);

    if (!empty($monthBlock['projects'])) {
        $out[] = $monthBlock;
    }
}

// sort months newest-to-oldest
usort($out, fn($a, $b) =>
    $b['year']  <=> $a['year']
    ?: $b['month'] <=> $a['month']
);

echo json_encode($out, JSON_UNESCAPED_SLASHES);
