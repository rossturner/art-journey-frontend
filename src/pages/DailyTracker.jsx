import { Container, Title, Text, Group, Stack, Center, Loader, Button, Badge, Box } from '@mantine/core';
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
    default:
      return 'gray';
  }
}

function CompactTimeSlot({ status, notes }) {
  return (
    <Group gap="xs" style={{ minWidth: '250px', maxWidth: '250px' }}>
      <Badge color={getStatusColor(status)} variant="light" size="xs" style={{ minWidth: '60px' }}>
        {status}
      </Badge>
      {notes ? (
        <Text size="xs" c="dimmed" truncate style={{ flex: 1 }} title={notes}>
          {notes}
        </Text>
      ) : (
        <Text size="xs" c="dimmed" fs="italic" style={{ flex: 1 }}>
          -
        </Text>
      )}
    </Group>
  );
}

function CompactDayEntry({ entry }) {
  const extraHours = entry.extraHours && !isNaN(parseFloat(entry.extraHours)) ? parseFloat(entry.extraHours) : null;
  
  return (
    <Box
      key={entry.dateString}
      p="xs"
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-3)',
        '&:hover': { backgroundColor: 'var(--mantine-color-gray-0)' }
      }}
    >
      <Group justify="space-between" gap="md">
        <Group gap="md" style={{ flex: 1 }}>
          <Text fw={600} size="sm" style={{ minWidth: '80px' }}>
            {entry.shortDate}
          </Text>
          <CompactTimeSlot status={entry.morning.status} notes={entry.morning.notes} />
          <CompactTimeSlot status={entry.midday.status} notes={entry.midday.notes} />
          <CompactTimeSlot status={entry.evening.status} notes={entry.evening.notes} />
        </Group>
        <Text size="xs" c="dimmed" style={{ minWidth: '60px', textAlign: 'right' }}>
          {extraHours !== null ? `${extraHours} hours` : ''}
        </Text>
      </Group>
    </Box>
  );
}

export default function DailyTracker() {
  const { data, loading, error, refetch } = useDailyTracker();

  // Calculate 40-day total hours (excluding the latest day)
  const calculate40DayTotal = () => {
    if (data.length === 0) return 0;
    
    // Flatten all entries from all months
    const allEntries = data.flatMap(monthGroup => monthGroup.entries);
    
    // Skip the first entry (latest day) and take the next 40 days
    const past40Days = allEntries.slice(1, 41);
    
    let totalHours = 0;
    past40Days.forEach(entry => {
      // Count 1 hour for each non-"None" time slot
      if (entry.morning.status !== 'None') totalHours += 1;
      if (entry.midday.status !== 'None') totalHours += 1;
      if (entry.evening.status !== 'None') totalHours += 1;
      
      // Add extra hours if they exist and are numeric
      if (entry.extraHours && !isNaN(parseFloat(entry.extraHours))) {
        totalHours += parseFloat(entry.extraHours);
      }
    });
    
    return totalHours;
  };

  const total40DayHours = calculate40DayTotal();

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

      {/* 40-day total hours */}
      <Box p="md" mb="lg" style={{ 
        backgroundColor: 'var(--mantine-color-blue-0)', 
        border: '1px solid var(--mantine-color-blue-3)',
        borderRadius: '8px'
      }}>
        <Group justify="center" gap="md">
          <Text fw={700} size="lg" c="blue">
            Past 40 Days: {total40DayHours} hours
          </Text>
        </Group>
      </Box>

      {/* Header row */}
      <Group justify="space-between" gap="md" mb="sm" p="xs" 
             style={{ borderBottom: '2px solid var(--mantine-color-gray-4)', fontWeight: 600 }}>
        <Group gap="md" style={{ flex: 1 }}>
          <Text fw={700} size="sm" style={{ minWidth: '80px' }}>Date</Text>
          <Text fw={700} size="sm" style={{ minWidth: '250px' }}>Morning</Text>
          <Text fw={700} size="sm" style={{ minWidth: '250px' }}>Midday</Text>
          <Text fw={700} size="sm" style={{ minWidth: '250px' }}>Evening</Text>
        </Group>
        <Text fw={700} size="sm" style={{ minWidth: '60px', textAlign: 'right' }}>Extra</Text>
      </Group>

      {data.length === 0 ? (
        <Center>
          <Text c="dimmed">No daily tracker data found</Text>
        </Center>
      ) : (
        <Stack gap="lg">
          {data.map((monthGroup) => (
            <div key={monthGroup.monthKey}>
              <Title order={4} mb="sm" c="blue">{monthGroup.monthLabel}</Title>
              <Box style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: '4px' }}>
                {monthGroup.entries.map((entry) => (
                  <CompactDayEntry key={entry.dateString} entry={entry} />
                ))}
              </Box>
            </div>
          ))}
        </Stack>
      )}
    </Container>
  );
}