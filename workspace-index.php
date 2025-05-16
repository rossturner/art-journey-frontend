<?php
header('Content-Type: application/json');

$root = __DIR__ . '/workspace';                 // adjust if you park it elsewhere
$out  = [];

foreach (scandir($root) as $ym) {
    // expect folders like "2025 05"
    if (!preg_match('/^\d{4}\s\d{2}$/', $ym)) continue;

    [$year, $month] = explode(' ', $ym);
    $monthBlock = ['year' => (int)$year, 'month' => (int)$month, 'projects' => []];

    foreach (scandir("$root/$ym") as $proj) {
        if ($proj[0] === '.') continue;             // skip dotfiles
        $path = "$root/$ym/$proj";
        if (!is_dir($path)) continue;

        $files       = array_values(array_filter(scandir($path), fn($f) => $f[0] !== '.'));
        $final       = preg_grep('/final.*\.(png|jpe?g|gif)$/i', $files);
        $wips        = preg_grep('/wip(\d+).*?\.(png|jpe?g|gif)$/i', $files);
        usort($wips, fn($a, $b) =>
            (int)preg_replace('/.*wip(\d+).*/i', '$1', $a)
            - (int)preg_replace('/.*wip(\d+).*/i', '$1', $b)
        );
        $clips       = preg_grep('/\.clip$/i', $files);
        $timelapse   = preg_grep('/timelapse.*\.mp4$/i', $files);

        if (!$final && !$wips) continue;            // nothing worth listing

        preg_match('/\b(\d{2})\b/', $proj, $d);
        $day = isset($d[1]) ? (int)$d[1] : 1;

        $monthBlock['projects'][] = [
            'title'     => $proj,
            'day'       => $day,
            'thumbnail' => ($final ? "$ym/$proj/" . reset($final)
                                    : "$ym/$proj/" . end($wips)),
            'final'     => array_map(fn($f) => "$ym/$proj/$f", $final),
            'wip'       => array_map(fn($f) => "$ym/$proj/$f", $wips),
            'clip'      => array_map(fn($f) => "$ym/$proj/$f", $clips),
            'timelapse' => $timelapse ? "$ym/$proj/" . reset($timelapse) : null,
        ];
    }

    usort($monthBlock['projects'], fn($a, $b) => $a['day'] <=> $b['day']);
    if ($monthBlock['projects']) $out[] = $monthBlock;
}

echo json_encode($out, JSON_UNESCAPED_SLASHES);
