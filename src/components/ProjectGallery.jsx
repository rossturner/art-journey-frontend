import {Card, CardSection, Center, Container, Image, Loader, SimpleGrid, Text, Title,} from '@mantine/core';
import {Link} from 'react-router-dom';
import useWorkspace from '../hooks/useWorkspace';

export default function ProjectGallery() {
    const blocks = useWorkspace();

    if (!blocks) {
        return (
            <Center py="xl">
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
                        <Title order={3} mb="md">
                            {monthLabel}
                        </Title>

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

                                        <Text mt="sm" fw={500}>
                                            {p.title}
                                        </Text>
                                        <Text size="xs" c="dimmed">
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
