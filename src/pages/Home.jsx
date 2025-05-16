import {Card, CardSection, Center, Container, Image, Loader, SimpleGrid, Text,} from '@mantine/core';
import {Link} from 'react-router-dom';
import useWorkspace from '../hooks/useWorkspace';

export default function Home() {
    const blocks = useWorkspace();

    if (!blocks) {
        return (
            <Center h="100vh">
                <Loader size="lg" />
            </Center>
        );
    }

    return (
        <Container size="lg" py="xl">
            {blocks.map(({ year, month, projects }) => {
                const monthLabel = new Date(year, month - 1, 1).toLocaleString(
                    undefined,
                    { month: 'long', year: 'numeric' }
                );

                return (
                    <section key={`${year}-${month}`} style={{ marginBottom: '2rem' }}>
                        <Text weight={700} size="xl" mb="md">
                            {monthLabel}
                        </Text>

                        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                            {projects.map((p) => {
                                const route = `/${year}/${String(month).padStart(2, '0')}/${p.slug}`;

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

                                        <Text mt="sm" weight={500}>
                                            {p.title}
                                        </Text>
                                        <Text size="xs" color="dimmed">
                                            {p.dateLabel}
                                        </Text>
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
