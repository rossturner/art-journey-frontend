import {
    Card,
    CardSection,
    Center,
    Container,
    Image,
    Loader,
    SegmentedControl,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import useWorkspace from '../hooks/useWorkspace';

export default function ProjectGallery() {
    const blocks = useWorkspace();
    const [order, setOrder] = useState('newest');

    if (!blocks) {
        return (
            <Center py="xl">
                <Loader size="lg" />
            </Center>
        );
    }

    // decide display order
    const viewBlocks =
        order === 'newest' ? blocks : [...blocks].reverse();

    return (
        <Container size="lg" py="xl">
            {/* toggle */}
            <SegmentedControl
                value={order}
                onChange={(v) => setOrder(v)}
                data={[
                    { label: 'Newest first', value: 'newest' },
                    { label: 'Oldest first', value: 'oldest' },
                ]}
                size="sm"
                mb="lg"
            />

            {viewBlocks.map(({ year, month, projects }) => {
                const monthLabel = new Date(year, month - 1, 1).toLocaleString(
                    undefined,
                    { month: 'long', year: 'numeric' }
                );

                // inside a month, flip project order when showing oldest first
                const viewProjects =
                    order === 'newest' ? projects : [...projects].reverse();

                return (
                    <section key={`${year}-${month}`} style={{ marginBottom: '2rem' }}>
                        <Title order={3} mb="md">
                            {monthLabel}
                        </Title>

                        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                            {viewProjects.map((p) => {
                                const route = `/${year}/${String(month).padStart(
                                    2,
                                    '0'
                                )}/${p.slug}`;

                                return (
                                    <Card
                                        key={p.slug}
                                        component={Link}
                                        to={route}
                                        shadow="sm"
                                        withBorder
                                    >
                                        <CardSection>
                                            <Image
                                                src={`/workspace/${p.thumbnail}`}
                                                alt={p.title}
                                            />
                                        </CardSection>

                                        <Stack spacing={4} mt="sm">
                                            <Text fw={500}>{p.title}</Text>
                                            <Text size="xs" c="dimmed">
                                                {p.dateLabel}
                                            </Text>
                                        </Stack>
                                    </Card>
                                );
                            })}
                        </SimpleGrid>
                    </section>
                );
            })}
        </Container>
    );
}
