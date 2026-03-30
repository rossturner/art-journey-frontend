import { Container, Title, Text, Group, Stack, Center, Loader, Button, Badge, Box, SimpleGrid, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { format } from 'date-fns';
import useDailyTracker from '../hooks/useDailyTracker';

function getStatusColor(status) {
  switch (status) {
    case 'Active':
      return 'green';
    case 'Practice':
      return 'blue';
    case 'Passive':
      return 'yellow';
    case 'None':
      return 'red';
    default:
      return 'gray';
  }
}

function CompactTimeSlot({ status, notes }) {
  return (
    <Group gap="xs" style={{ flex: 1, minWidth: '0' }}>
      <Badge color={getStatusColor(status)} variant="light" size="xs" style={{ minWidth: '60px', flexShrink: 0 }}>
        {status}
      </Badge>
      {notes ? (
        <Text size="xs" c="dimmed" truncate style={{ flex: 1, minWidth: '0' }} title={notes}>
          {notes}
        </Text>
      ) : (
        <Text size="xs" c="dimmed" fs="italic" style={{ flex: 1, minWidth: '0' }}>
          -
        </Text>
      )}
    </Group>
  );
}

function CompactDayEntry({ entry }) {
  const extraTotal = entry.extraTotal && !isNaN(parseFloat(entry.extraTotal)) ? parseFloat(entry.extraTotal) : null;

  return (
    <Box
      key={entry.dateString}
      p="xs"
      style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        '&:hover': { backgroundColor: 'var(--mantine-color-gray-0)' }
      }}
    >
      <Group justify="space-between" gap="md">
        <Group gap="md" style={{ flex: 1, minWidth: '0' }}>
          <Text fw={600} size="sm" style={{ minWidth: '80px', flexShrink: 0 }}>
            {entry.shortDate}
          </Text>
          <CompactTimeSlot status={entry.morning.status} notes={entry.morning.notes} />
          <CompactTimeSlot status={entry.midday.status} notes={entry.midday.notes} />
          <CompactTimeSlot status={entry.evening.status} notes={entry.evening.notes} />
        </Group>
        <Text size="xs" c="dimmed" style={{ minWidth: '60px', textAlign: 'right', flexShrink: 0 }}>
          {extraTotal !== null ? `${extraTotal} hours` : ''}
        </Text>
      </Group>
    </Box>
  );
}

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
          borderRadius: '6px'
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

export default function DailyTracker() {
  const { data, loading, error, refetch } = useDailyTracker();

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

  const allEntries = data.flatMap(monthGroup => monthGroup.entries);
  const fortyDaysAgo = new Date();
  fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 40);
  const fortyDayEntries = allEntries.slice(1).filter(entry => entry.date >= fortyDaysAgo);
  const stats40Days = calculateStats(fortyDayEntries);
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const yearEntries = allEntries.slice(1).filter(entry => entry.date >= oneYearAgo);
  const statsYear = calculateStats(yearEntries);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const cutoffKey = format(sixMonthsAgo, 'yyyy-MM');

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Center>
          <Stack align="center" gap="md">
            <Loader size="lg" />
            <Text c="dimmed">Loading daily tracker...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Center>
          <Stack align="center" gap="md">
            <Text c="red" fw={600}>Failed to load daily tracker</Text>
            <Text c="dimmed" size="sm">{error}</Text>
            <Button onClick={refetch} variant="outline">
              Try Again
            </Button>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">Daily Art Journey Tracker</Title>

      <Text c="dimmed" mb="md" size="sm">
        10 months in to my art journey, I realized I was only putting in a few hours per week to practicing art.
        Although I don't want to lean too hard into the "grind" culture around art, I do think it's true that it takes
        around 10,000 hours to master a skill. If I only spent a few hours a week practicing art, I would die of old age
        before I reach that point!<br />
        <br/>
        So I've started a regimen of tracking my daily art practice, aiming for at least 3 blocks of an hour each day:
        morning, midday, and evening. This page shows my daily tracker data, grouped by month.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb="lg">
        <SummaryBanner label="Past 40 Days" stats={stats40Days} />
        <SummaryBanner label="Past Year" stats={statsYear} />
      </SimpleGrid>

      {/* Header row */}
      <Group justify="space-between" gap="md" mb="sm" p="xs"
             style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.12)', fontWeight: 600 }}>
        <Group gap="md" style={{ flex: 1, minWidth: '0' }}>
          <Text fw={700} size="sm" style={{ minWidth: '80px', flexShrink: 0 }}>Date</Text>
          <Text fw={700} size="sm" style={{ flex: 1 }}>Morning</Text>
          <Text fw={700} size="sm" style={{ flex: 1 }}>Midday</Text>
          <Text fw={700} size="sm" style={{ flex: 1 }}>Evening</Text>
        </Group>
        <Text fw={700} size="sm" style={{ minWidth: '60px', textAlign: 'right', flexShrink: 0 }}>Extra</Text>
      </Group>

      {data.length === 0 ? (
        <Center>
          <Text c="dimmed">No daily tracker data found</Text>
        </Center>
      ) : (
        <Stack gap="lg">
          {data.map((monthGroup) => {
            const isOld = monthGroup.monthKey <= cutoffKey;

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
        </Stack>
      )}
    </Container>
  );
}
