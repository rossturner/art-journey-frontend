# Daily Tracker Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Past Year" summary banner, auto-collapse months older than 6 months, and refine the dark theme styling of the Daily Tracker page.

**Architecture:** All changes are in `src/pages/DailyTracker.jsx`. Extract a shared stats calculation helper, add a reusable `SummaryBanner` component used by both the 40-day and year banners, add a `CollapsedMonth` component for old months, and update color values for dark-theme consistency.

**Tech Stack:** React, Mantine UI (SimpleGrid, Badge, Box, Group, Text, UnstyledButton), date-fns

---

### File Structure

All changes are in a single file:

- **Modify:** `src/pages/DailyTracker.jsx`
  - New imports: `SimpleGrid`, `UnstyledButton` from `@mantine/core`; `useState` from `react`; `format` from `date-fns`
  - New helper: `calculateStats(entries)` — shared stats calculation
  - New component: `SummaryBanner` — reusable banner for both 40-day and year views
  - New component: `CollapsedMonth` — summary row for old months
  - Modified component: `DailyTracker` — uses new components, adds expand/collapse state, updates styling

No other files are changed. The data hook (`src/hooks/useDailyTracker.js`) is untouched.

---

### Task 1: Extract shared stats helper and add year banner

**Files:**
- Modify: `src/pages/DailyTracker.jsx`

**Context:** The current `calculate40DayStats` function (lines 71-117) is inlined in the component and only serves the 40-day banner. We need to extract the calculation logic into a reusable helper, then use it for both the 40-day and a new "Past Year" banner displayed side by side.

- [ ] **Step 1: Add new imports**

At the top of `src/pages/DailyTracker.jsx`, update the imports:

```jsx
import { Container, Title, Text, Group, Stack, Center, Loader, Button, Badge, Box, SimpleGrid } from '@mantine/core';
import useDailyTracker from '../hooks/useDailyTracker';
```

Note: `useState`, `UnstyledButton`, and `format` are not needed yet — they'll be added in Task 2.

- [ ] **Step 2: Create the `calculateStats` helper function**

Add this function above the `DailyTracker` component (after `CompactDayEntry`, before `export default function DailyTracker`). This replaces the inlined `calculate40DayStats`:

```jsx
function calculateStats(entries) {
  let total = 0;
  let passive = 0;
  let practice = 0;
  let active = 0;

  entries.forEach(entry => {
    if (entry.totalHours && !isNaN(parseFloat(entry.totalHours))) {
      total += parseFloat(entry.totalHours);
    }

    if (entry.morning.status === 'Passive') passive += 1;
    else if (entry.morning.status === 'Practice') practice += 1;
    else if (entry.morning.status === 'Active') active += 1;

    if (entry.midday.status === 'Passive') passive += 1;
    else if (entry.midday.status === 'Practice') practice += 1;
    else if (entry.midday.status === 'Active') active += 1;

    if (entry.evening.status === 'Passive') passive += 1;
    else if (entry.evening.status === 'Practice') practice += 1;
    else if (entry.evening.status === 'Active') active += 1;

    if (entry.extraPassive && !isNaN(parseFloat(entry.extraPassive))) {
      passive += parseFloat(entry.extraPassive);
    }
    if (entry.extraPractice && !isNaN(parseFloat(entry.extraPractice))) {
      practice += parseFloat(entry.extraPractice);
    }
    if (entry.extraActive && !isNaN(parseFloat(entry.extraActive))) {
      active += parseFloat(entry.extraActive);
    }
  });

  return { total, passive, practice, active };
}
```

- [ ] **Step 3: Create the `SummaryBanner` component**

Add this component after `calculateStats`:

```jsx
function SummaryBanner({ label, stats }) {
  return (
    <Box p="md" style={{
      backgroundColor: 'rgba(99, 163, 255, 0.08)',
      border: '1px solid rgba(99, 163, 255, 0.2)',
      borderRadius: '8px'
    }}>
      <Group justify="center" gap="md">
        <Text fw={700} size="lg" c="blue">
          {label}: {stats.total} hours
        </Text>
      </Group>
      <Group justify="center" gap="lg" mt="xs">
        <Text size="sm" c="dimmed">
          <Badge color="yellow" variant="light" size="xs" mr="xs">Passive</Badge>
          {stats.passive} hours
        </Text>
        <Text size="sm" c="dimmed">
          <Badge color="blue" variant="light" size="xs" mr="xs">Practice</Badge>
          {stats.practice} hours
        </Text>
        <Text size="sm" c="dimmed">
          <Badge color="green" variant="light" size="xs" mr="xs">Active</Badge>
          {stats.active} hours
        </Text>
      </Group>
    </Box>
  );
}
```

Key differences from the current banner: uses `variant="light"` on badges (currently `variant="filled"`), uses translucent `rgba` background/border (currently uses `var(--mantine-color-blue-0)` and `var(--mantine-color-blue-3)` which are light-theme tokens).

- [ ] **Step 4: Replace the inline calculation and banner in `DailyTracker`**

Inside the `DailyTracker` component, replace the `calculate40DayStats` function and `stats40Days` call with:

```jsx
const allEntries = data.flatMap(monthGroup => monthGroup.entries);
const stats40Days = calculateStats(allEntries.slice(1, 41));
const statsYear = calculateStats(allEntries.slice(1, 366));
```

Delete the entire `calculate40DayStats` function (lines 71-117) and the `const stats40Days = calculate40DayStats();` call (line 119). Place the new three lines right after the `useDailyTracker()` call. Note: the old function had a `data.length === 0` guard — this is no longer needed because `calculateStats([])` safely returns `{ total: 0, passive: 0, practice: 0, active: 0 }`, and the `allEntries` flatMap on an empty `data` array just produces `[]`.

Then replace the existing banner JSX (the `<Box>` with "Past 40 Days" — currently lines 165-189) with:

```jsx
<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb="lg">
  <SummaryBanner label="Past 40 Days" stats={stats40Days} />
  <SummaryBanner label="Past Year" stats={statsYear} />
</SimpleGrid>
```

- [ ] **Step 5: Verify visually**

Run: `npm run dev` (if not already running)

Open http://localhost:5173/#/daily-tracker and verify:
- Two banners appear side by side on desktop, stacked on mobile
- Both show hours with passive/practice/active breakdown
- Badges use soft translucent style, not solid filled
- Banner backgrounds are subtle translucent blue, not solid

- [ ] **Step 6: Commit**

```bash
git add src/pages/DailyTracker.jsx
git commit -m "feat(daily-tracker): add year summary banner and extract shared stats helper"
```

---

### Task 2: Add month collapsing for old months

**Files:**
- Modify: `src/pages/DailyTracker.jsx`

**Context:** After Task 1, the page has two banners but all months are still fully expanded. This task adds automatic collapsing for months older than 6 months, with click-to-expand.

- [ ] **Step 1: Add new imports for Task 2**

Update the imports at the top of `DailyTracker.jsx`:

```jsx
import { Container, Title, Text, Group, Stack, Center, Loader, Button, Badge, Box, SimpleGrid, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { format } from 'date-fns';
import useDailyTracker from '../hooks/useDailyTracker';
```

Added: `UnstyledButton` from Mantine, `useState` from React, `format` from date-fns.

- [ ] **Step 2: Add the `CollapsedMonth` component**

Add this component after `SummaryBanner` in `DailyTracker.jsx`:

```jsx
function CollapsedMonth({ monthGroup, stats, expanded, onToggle }) {
  return (
    <div>
      <UnstyledButton
        onClick={onToggle}
        w="100%"
        p="sm"
        mb={expanded ? 'sm' : 0}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        <Group justify="space-between">
          <Group gap="md">
            <Text fw={600} size="sm" c="blue">{monthGroup.monthLabel}</Text>
            <Text size="sm" c="dimmed">
              {stats.total} hours
              ({stats.passive} passive, {stats.practice} practice, {stats.active} active)
            </Text>
          </Group>
          <Text size="sm" c="dimmed">{expanded ? '▼' : '▶'}</Text>
        </Group>
      </UnstyledButton>
      {expanded && (
        <Box style={{ border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '4px' }}>
          {monthGroup.entries.map((entry) => (
            <CompactDayEntry key={entry.dateString} entry={entry} />
          ))}
        </Box>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Add expand/collapse state and cutoff logic to `DailyTracker`**

Inside the `DailyTracker` component, add the state right after the `useDailyTracker()` call (before the `allEntries` line from Task 1):

```jsx
const [expandedMonths, setExpandedMonths] = useState(new Set());

const toggleMonth = (monthKey) => {
  setExpandedMonths(prev => {
    const next = new Set(prev);
    if (next.has(monthKey)) {
      next.delete(monthKey);
    } else {
      next.add(monthKey);
    }
    return next;
  });
};
```

After the `statsYear` line (from Task 1), add the cutoff calculation:

```jsx
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
const cutoffKey = format(sixMonthsAgo, 'yyyy-MM');
```

- [ ] **Step 4: Update the month rendering logic**

Replace the inner `data.map((monthGroup) => ...)` block inside the `<Stack gap="lg">` (leave the surrounding `data.length === 0 ? ... :` conditional intact):

```jsx
{data.map((monthGroup) => {
  const isOld = monthGroup.monthKey < cutoffKey;

  if (isOld) {
    const monthStats = calculateStats(monthGroup.entries);
    return (
      <CollapsedMonth
        key={monthGroup.monthKey}
        monthGroup={monthGroup}
        stats={monthStats}
        expanded={expandedMonths.has(monthGroup.monthKey)}
        onToggle={() => toggleMonth(monthGroup.monthKey)}
      />
    );
  }

  return (
    <div key={monthGroup.monthKey}>
      <Title order={4} mb="sm" c="blue">{monthGroup.monthLabel}</Title>
      <Box style={{ border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '4px' }}>
        {monthGroup.entries.map((entry) => (
          <CompactDayEntry key={entry.dateString} entry={entry} />
        ))}
      </Box>
    </div>
  );
})}
```

Note: the month container border is also updated here from `var(--mantine-color-gray-3)` to `rgba(255, 255, 255, 0.06)` — this applies to both recent and old months.

- [ ] **Step 5: Verify visually**

Open http://localhost:5173/#/daily-tracker and verify:
- March 2026 is fully expanded (less than 6 months old)
- October 2025 and September 2025 are collapsed to summary rows showing totals
- Clicking a collapsed month expands it to show day rows
- Clicking again collapses it back
- The expand arrow toggles between ▶ and ▼

- [ ] **Step 6: Commit**

```bash
git add src/pages/DailyTracker.jsx
git commit -m "feat(daily-tracker): auto-collapse months older than 6 months"
```

---

### Task 3: Update remaining styling for dark theme consistency

**Files:**
- Modify: `src/pages/DailyTracker.jsx`

**Context:** After Tasks 1-2, the banners and month containers already use the new translucent styles. This task updates the remaining elements: row separators and column header border.

- [ ] **Step 1: Update row separator color in `CompactDayEntry`**

In the `CompactDayEntry` component, find the `<Box>` style:

```jsx
borderBottom: '1px solid var(--mantine-color-gray-3)',
```

Change it to:

```jsx
borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
```

- [ ] **Step 2: Update column header border**

In the `DailyTracker` component's return JSX, find the column header `<Group>` with style:

```jsx
borderBottom: '2px solid var(--mantine-color-gray-4)',
```

Change it to:

```jsx
borderBottom: '2px solid rgba(255, 255, 255, 0.12)',
```

- [ ] **Step 3: Verify visually**

Open http://localhost:5173/#/daily-tracker and verify:
- Row separators between days are subtle (barely visible)
- Column header line is slightly more visible than row separators but still subtle
- Overall page feels cohesive with the dark theme — no bright/harsh lines

- [ ] **Step 4: Commit**

```bash
git add src/pages/DailyTracker.jsx
git commit -m "style(daily-tracker): refine separator colors for dark theme"
```
