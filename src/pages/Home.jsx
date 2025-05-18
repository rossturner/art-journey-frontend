import {Box, Container, Stack, Text, Title} from '@mantine/core';
import ProjectGallery from '../components/ProjectGallery';

export default function Home() {
    return (
        <>
            {/* Intro */}
            <Box component="section" py="lg">
                <Container size="lg">
                    <Stack spacing="sm" align="center">
                        <Title order={1} size={34} ta="center">
                            Welcome to Ziedritz.art!
                        </Title>

                        <Text size="lg" ta="center" maw={700}>
                            This site is my journal of studies, sketches and finished illustrations,
                            charting progress from absolute beginner (Sept 2024) to today.
                        </Text>

                        <Text size="lg" ta="center" maw={700}>
                            Click any thumbnail to dive into process shots, notes and timelapses.
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* Gallery */}
            <Box component="section" mt="xl">
                <ProjectGallery />
            </Box>
        </>
    );
}
