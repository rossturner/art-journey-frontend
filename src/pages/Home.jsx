import {Card, CardSection, Center, Container, Image, Loader, SimpleGrid, Text} from '@mantine/core';
import {Link} from 'react-router-dom';
import useWorkspace from '../hooks/useWorkspace';

export default function Home() {
    const data = useWorkspace();        // pulls JSON from /workspace-index.php

    // show spinner while we’re still fetching
    if (!data) {
        return (
            <Center h="100vh">
                <Loader size="lg" />
            </Center>
        );
    }

    // flatten months → projects and sort newest-first
    const projects = [];
    data.forEach(({ year, month, projects: list }) => {
        list.forEach((p) => {
            const date = new Date(year, month - 1, p.day ?? 1).getTime();
            projects.push({
                ...p,
                route: `/${year}/${String(month).padStart(2, '0')}/${p.title}`,
                date,
            });
        });
    });
    projects.sort((a, b) => b.date - a.date);


    return (
        <Container size="lg" py="xl">               {/* ← new wrapper */}
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}        // breakpoints
                spacing="lg"
            >
                {projects.map((p) => (
                    <Card
                        key={p.route}
                        component={Link}
                        to={p.route}
                        shadow="sm"
                        withBorder
                    >
                        <CardSection>
                            <Image src={`/workspace/${p.thumbnail}`} alt={p.title} />
                        </CardSection>

                        <Text mt="sm" fw={500}>
                            {p.title}
                        </Text>
                        <Text size="xs" c="dimmed">
                            {new Date(p.date).toLocaleDateString()}
                        </Text>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
}
