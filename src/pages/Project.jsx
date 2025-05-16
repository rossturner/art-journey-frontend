import {Anchor, Center, Group, Image, Loader, Stack, Text, Title,} from '@mantine/core';
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

    return (
        <Stack spacing="xl" px="md" py="lg">
            <Title order={2}>{project.title}</Title>

            {project.final.map((f) => (
                <Image key={f} src={`/workspace/${f}`} alt={project.title} radius="md" />
            ))}

            {project.wip.map((w) => (
                <Image key={w} src={`/workspace/${w}`} alt={project.title} radius="md" />
            ))}

            {project.clip.length > 0 && (
                <Group>
                    {project.clip.map((c) => (
                        <Anchor key={c} href={`/workspace/${c}`} download>
                            Download .clip
                        </Anchor>
                    ))}
                </Group>
            )}

            {project.timelapse && (
                <video controls src={`/workspace/${project.timelapse}`} style={{ width: '100%' }} />
            )}

            <Anchor component={Link} to="/">
                ← Back to all work
            </Anchor>
        </Stack>
    );
}
