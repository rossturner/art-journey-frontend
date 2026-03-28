# Daily Tracker Improvements — Design Spec

## Goal

Improve the Daily Tracker page with summary views, automatic collapsing of old months, and refined visual styling while keeping the dark theme.

## Current State

The Daily Tracker (`src/pages/DailyTracker.jsx`) fetches CSV data from a published Google Sheet via `src/hooks/useDailyTracker.js`. It displays:

- A "Past 40 Days" summary banner with total hours and passive/practice/active breakdown
- All day entries grouped by month, every month fully expanded, newest first

**Problems:**
- No year-level summary
- All months render at full detail regardless of age, making the page increasingly long
- The 40-day banner uses a solid blue background that feels flat against the dark theme
- Badge colors and row separators are slightly harsh

## Design

### Page Layout (top to bottom)

1. **Title + intro text** — unchanged
2. **Summary banners** — two banners side by side in a responsive row:
   - "Past 40 Days" — existing logic (skip today, take next 40 entries)
   - "Past Year" — new, same format, covering past 365 days
   - On mobile (`base`), stack vertically; on `sm+`, side by side
3. **Column headers** — Date, Morning, Midday, Evening, Extra — unchanged, positioned above the month groups. Since months are sorted newest-first, the first month group will always be a recent (expanded) one, so the headers always sit above day rows. Collapsed month summaries have their own layout and don't need separate headers.
4. **Recent months** (less than 6 months old) — fully expanded day-by-day rows
5. **Older months** (6+ months old) — collapsed to a single summary row per month, clickable to expand

### Summary Banners

Both banners use the same component with these props: label (e.g. "Past 40 Days"), total hours, and per-type breakdown (passive, practice, active hours).

**Styling:**
- Background: `rgba(99, 163, 255, 0.08)`
- Border: `1px solid rgba(99, 163, 255, 0.2)`
- Border radius: `8px`
- Title: blue, bold, `lg` size
- Breakdown: `sm` size, dimmed text, with colored badges

### Banner Calculations

Both banners use entry-count-based slicing, not calendar-date-based filtering. This is intentional — it matches the existing 40-day logic and avoids complexity around gaps in the spreadsheet (days with no row).

Flatten all entries once at the top level (`data.flatMap(monthGroup => monthGroup.entries)`) and reuse for both calculations:

- **40-day:** `allEntries.slice(1, 41)` — skip today, take next 40 entries
- **Year:** `allEntries.slice(1, 366)` — skip today, take next 365 entries

For both: uses the `totalHours` field from the spreadsheet for the aggregate total (with `!isNaN(parseFloat(...))` guard for empty/invalid values), and counts individual slots + extras for the per-type breakdown (same guards). Extract the calculation into a shared helper function that takes a slice of entries and returns `{ total, passive, practice, active }`.

**Labels are static** — "Past 40 Days" and "Past Year" regardless of how many entries actually exist. If fewer than 40 entries exist, the banner shows the total for however many there are.

### Month Collapsing

The 6-month cutoff is calculated dynamically:

```js
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
const cutoffKey = format(sixMonthsAgo, 'yyyy-MM');
```

A month group is "old" if `monthGroup.monthKey < cutoffKey`.

**Collapsed month row:**
- Shows: month name, total hours, per-type breakdown (passive, practice, active)
- Styled as a subtle card: `rgba(255, 255, 255, 0.03)` background, `rgba(255, 255, 255, 0.06)` border, rounded corners
- Clickable — toggles to show the full day rows beneath it
- Expand indicator: a small arrow/chevron (`▶` collapsed, `▼` expanded)

**Expanded old months** show the same day-by-day rows as recent months.

**State management:** Track expanded months as a `Set<string>` of `monthKey` values in a single `useState`. Initially empty (all old months collapsed). Toggle a month by adding/removing its key.

**Edge case — no old months:** If all months are within the 6-month window, nothing renders in the collapsed section. No empty-state message needed.

Month summary totals use the same shared helper function as the banners: pass the month's entries, get back `{ total, passive, practice, active }`. This combines slot-count hours (1 per filled morning/midday/evening) with extra hours, same as the banner calculations.

### Styling Refinements

**Badge colors** — use translucent backgrounds matching status color:
- Active: `rgba(76, 175, 80, 0.15)` background, `green` Mantine variant `light`
- Practice: `rgba(77, 157, 224, 0.15)` background, `blue` variant `light`
- Passive: `rgba(230, 168, 53, 0.15)` background, `yellow` variant `light`
- None: `rgba(239, 68, 68, 0.15)` background, `red` variant `light`

The day-row badges in `CompactTimeSlot` already use `variant="light"` and `size="xs"` — no change needed there.

The banner breakdown badges currently use `variant="filled"` — change these to `variant="light"` to match the softer style.

**Row separators:**
- Change from `var(--mantine-color-gray-3)` to `rgba(255, 255, 255, 0.06)` for subtler lines
- Month container border: same `rgba(255, 255, 255, 0.06)`
- Column header bottom border: change from `var(--mantine-color-gray-4)` to `rgba(255, 255, 255, 0.12)` (slightly more visible than row separators to maintain hierarchy)

**Banner background:**
- Replace `var(--mantine-color-blue-0)` and `var(--mantine-color-blue-3)` with the translucent values above, which work properly in dark theme (the `-0` and `-3` Mantine color tokens are designed for light theme)

## Files Changed

- `src/pages/DailyTracker.jsx` — all changes are here (new imports needed: `SimpleGrid` and `UnstyledButton` from Mantine, `useState` from React, `format` from `date-fns`):
  - Add year calculation function (mirrors 40-day logic)
  - Add summary banner component (extracted, shared by both banners)
  - Add collapsed month summary component
  - Add expand/collapse state management
  - Update banner styling (translucent backgrounds)
  - Update row separator colors
  - Responsive banner layout using `SimpleGrid` with `cols={{ base: 1, sm: 2 }}`

- `src/hooks/useDailyTracker.js` — no changes needed. The hook already returns all data grouped by month with per-entry fields for totalHours, extraPassive, extraPractice, extraActive.

## Non-Goals

- No changes to the Google Sheets data source or CSV parsing
- No changes to the data hook
- No new routes or pages
- No animation on expand/collapse
