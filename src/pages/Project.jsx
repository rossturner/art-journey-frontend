import {Link, useParams} from 'react-router-dom';
import {Anchor, Center, Group, Image, Loader, Stack, Text, Title} from '@mantine/core';
import useWorkspace from '../hooks/useWorkspace';

export default function Project() {
    const { year, month, slug } = useParams();
    const workspace = useWorkspace();       // shared cache thanks to the hook

    if (!workspace) {
        return (
            <Center h="100vh">
                <Loader size="lg" />
            </Center>
        );
    }

    // locate the current project
    const monthInt = parseInt(month, 10);
    const monthBlock = workspace.find(
        (m) => String(m.year) === year && m.month === monthInt
    );
    const project = monthBlock?.projects.find((p) => p.title === slug);

    if (!project) {
        return <Text>Nothing here…</Text>;
    }

    return (
        <Stack spacing="xl">
            <Title order={2}>{project.title}</Title>

            {/* final images first */}
            {project.final?.map((f) => (
                <Image key={f} src={`/workspace/${f}`} alt={project.title} radius="md" />
            ))}

            {/* then WIP images */}
            {project.wip?.map((w) => (
                <Image key={w} src={`/workspace/${w}`} alt={project.title} radius="md" />
            ))}

            {/* .clip files, if any */}
            {project.clip?.length > 0 && (
                <Group>
                    {project.clip.map((c) => (
                        <Anchor key={c} href={`/workspace/${c}`} download>
                            Download .clip
                        </Anchor>
                    ))}
                </Group>
            )}

            {/* timelapse video */}
            {project.timelapse && (
                <video controls src={`/workspace/${project.timelapse}`} style={{ width: '100%' }} />
            )}

            <Anchor component={Link} to="/">
                ← Back to all work
            </Anchor>
        </Stack>
    );
}
