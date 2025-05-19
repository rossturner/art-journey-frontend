import {Button, Card, Code, Container, CopyButton, Divider, Group, Stack, Text, Title,} from '@mantine/core';
import {useEffect, useState} from 'react';
import {format} from 'date-fns';

export default function ArtTrendsCalendar() {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch('/static/events.json').then(r => r.json()).then(setEvents);
    }, []);

    const months = [
        'January','February','March','April','May','June',
        'July','August','September','October','November','December',
    ];
    const makeDate = e =>
        new Date(`${new Date().getFullYear()}-${e.month}-${e.startDay.padStart(2,'0')}`);
    const byMonth = events.reduce((a,e)=>(a[e.month]=[...(a[e.month]||[]),e],a),{});

    return (
        <Container>
            <Title order={2} mb="md">Art Trends Calendar</Title>

            <Text mb="sm">
                Missed #MikuDay again? This list shows every recurring art-trend tag, so you can sketch ahead of the rush.
            </Text>

            <Text mb="lg">
                Want reminders? Download the&nbsp;
                <Text component="a" href="/static/events.php" td="underline" inherit>
                    iCalendar (.ics)
                </Text>{' '}
                and import it to something like Google Calendar.<br />
                You may want to create a new calendar first or it will add these as events to your main calendar.
            </Text>

            {Object.entries(byMonth).sort(([a],[b])=>a-b).map(([m,list])=>(
                <Stack key={m} gap="sm" mt="lg">
                    <Title order={3}>{months[m-1]}</Title>
                    {list.sort((a,b)=>a.startDay-b.startDay).map(evt=>{
                        const tags=[evt.jpHashtag,evt.enHashtag].filter(Boolean);
                        const tagStr=tags.join(' ');
                        return (
                            <Card key={`${evt.month}-${evt.startDay}-${evt.title}`}>
                                <Group justify="space-between" mb="xs">
                                    <Group gap="sm">
                                        <Text fw={700}>{format(makeDate(evt),'MMM d')}</Text>
                                        <Text fw={600}>{evt.title}</Text>
                                    </Group>
                                    <CopyButton value={tagStr}>
                                        {({copied,copy})=>(
                                            <Button variant="light" size="xs" onClick={copy}>
                                                {copied?'Copied':'Copy tags'}
                                            </Button>
                                        )}
                                    </CopyButton>
                                </Group>
                                <Text size="sm" mb="xs">{evt.summary}</Text>
                                <Text size="xs" c="dimmed" mb="xs">{evt.dateReason}</Text>
                                <Group gap="xs">
                                    {tags.map(t=><Code key={t}>{t}</Code>)}
                                </Group>
                            </Card>
                        );
                    })}
                </Stack>
            ))}


            <Divider my="xl" />
        </Container>
    );
}
