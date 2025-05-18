import {
    Anchor,
    Center,
    Container,
    Divider,
    Group,
    Image,
    Loader,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import {Link, useParams} from 'react-router-dom';
import useWorkspace from '../hooks/useWorkspace';

export default function Project() {
    const { year, month, slug } = useParams();
    const blocks = useWorkspace();

    if (!blocks) {
        return (
            <Center h="100vh">
                <Loader size="lg" />
            </Center>
        );
    }

    const monthInt = parseInt(month, 10);
    const block = blocks.find(
        (m) => m.year === parseInt(year, 10) && m.month === monthInt
    );
    const project = block?.projects.find((p) => p.slug === slug);

    if (!project) {
        return <Text align="center">Nothing here…</Text>;
    }

    const hero = project.final.length > 0 ? project.final[0] : project.thumbnail;
    const otherFinals = project.final.slice(1);

    return (
        <Container size="lg" py="xl">
            <Stack spacing="xl">
                <Title order={2}>{project.title}</Title>

                <Anchor
                    href={`/workspace/${hero}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src={`/workspace/${hero}`} alt={project.title} radius="md" />
                </Anchor>

                {project.notes && (
                    <Paper withBorder p="md" radius="md">
                        {project.notes.split(/\r?\n/).map((line, idx) => (
                            <Text key={idx} mb={line ? 4 : 0}>
                                {line}
                            </Text>
                        ))}
                    </Paper>
                )}

                {otherFinals.length > 0 && (
                    <>
                        <Title order={4}>Final variations</Title>
                        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                            {otherFinals.map((f) => (
                                <Anchor
                                    key={f}
                                    href={`/workspace/${f}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src={`/workspace/${f}`} alt={project.title} />
                                </Anchor>
                            ))}
                        </SimpleGrid>
                    </>
                )}

                {project.wip.length > 0 && (
                    <>
                        <Title order={4}>Work-in-progress</Title>
                        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                            {project.wip.map((w) => (
                                <Anchor
                                    key={w}
                                    href={`/workspace/${w}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src={`/workspace/${w}`} alt={project.title} />
                                </Anchor>
                            ))}
                        </SimpleGrid>
                    </>
                )}

                {project.timelapse && (
                    <>
                        <Title order={4}>Timelapse</Title>
                        <Center>
                            <video
                                controls
                                src={`/workspace/${project.timelapse}`}
                                style={{ width: '100%', maxWidth: 640 }}
                            />
                        </Center>
                    </>
                )}

                {project.clip.length > 0 && (
                    <>
                        <Divider />
                        <Group>
                            {project.clip.map((c) => (
                                <Anchor key={c} href={`/workspace/${c}`} download>
                                    Download .clip
                                </Anchor>
                            ))}
                        </Group>
                    </>
                )}

                <Anchor component={Link} to="/">
                    ← Back to all work
                </Anchor>
            </Stack>
        </Container>
    );
}
