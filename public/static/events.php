<?php
/**
 * events-to-ics-recurring.php
 * Convert events.json → recurring .ics (Fixed-date entries only)
 * Access: /events.php            → starts this year
 *         /events.php?year=2026  → starts 2026
 */

header('Content-Type: text/calendar; charset=utf-8');
header('Content-Disposition: attachment; filename="events_recurring.ics"');

$year   = isset($_GET['year']) ? max(1970, intval($_GET['year'])) : intval(date('Y'));
$events = json_decode(file_get_contents(__DIR__ . '/events.json'), true);

echo "BEGIN:VCALENDAR\r\n";
echo "VERSION:2.0\r\n";
echo "PRODID:-//YourSite//Fixed Art Days//EN\r\n";
echo "CALSCALE:GREGORIAN\r\n";

foreach ($events as $ev) {
    if (strpos($ev['rules'], 'Fixed') !== 0) {
        continue;                               // skip variable-date events
    }

    $month = $ev['month'];
    $day   = $ev['startDay'];

    // first instance in chosen year
    $dtstart = sprintf('%04d%s%s', $year, $month, $day);
    $dtend   = date('Ymd', strtotime($dtstart . ' +1 day'));           // all-day → DTEND next day

    // RRULE for yearly recurrence on that month/day
    $rrule = "FREQ=YEARLY;BYMONTH={$month};BYMONTHDAY={$day}";

    // build DESCRIPTION
    $descParts = array_filter([
        $ev['summary']       ?? '',
        $ev['jpHashtag']     ?? '',
        $ev['enHashtag']     ?? ''
    ]);
    $description = implode(' ', $descParts);

    // escape per RFC 5545
    $esc = function ($s) {
        return str_replace([',', ';', "\n", "\r"], ['\\,', '\\;', '\\n', ''], $s);
    };

    echo "BEGIN:VEVENT\r\n";
    echo "UID:" . uniqid() . '@' . $_SERVER['SERVER_NAME'] . "\r\n";
    echo "DTSTAMP:" . gmdate('Ymd\THis\Z') . "\r\n";
    echo "DTSTART;VALUE=DATE:$dtstart\r\n";
    echo "DTEND;VALUE=DATE:$dtend\r\n";
    echo "RRULE:$rrule\r\n";
    echo "SUMMARY:" . $esc($ev['title']) . "\r\n";
    echo "DESCRIPTION:" . $esc($description) . "\r\n";
    echo "END:VEVENT\r\n";
}

echo "END:VCALENDAR\r\n";
