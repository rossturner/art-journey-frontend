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
    <Group gap="xs" style={{ minWidth: '200px', maxWidth: '200px' }}>
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
          {entry.formattedDate.split(',')[0]}
        </Text>
      </Group>
    </Box>
  );
}

export default function DailyTracker() {
  const { data, loading, error, refetch } = useDailyTracker();

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
        Track your daily art learning activities across different modes of engagement based on "Mastery" principles.
      </Text>

      {/* Header row */}
      <Group justify="space-between" gap="md" mb="sm" p="xs" 
             style={{ borderBottom: '2px solid var(--mantine-color-gray-4)', fontWeight: 600 }}>
        <Group gap="md" style={{ flex: 1 }}>
          <Text fw={700} size="sm" style={{ minWidth: '80px' }}>Date</Text>
          <Text fw={700} size="sm" style={{ minWidth: '200px' }}>Morning</Text>
          <Text fw={700} size="sm" style={{ minWidth: '200px' }}>Midday</Text>
          <Text fw={700} size="sm" style={{ minWidth: '200px' }}>Evening</Text>
        </Group>
        <Text fw={700} size="sm" style={{ minWidth: '60px', textAlign: 'right' }}>Full Date</Text>
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