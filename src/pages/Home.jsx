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
                            charting progress from absolute beginner (September 2024) to today.
                        </Text>
                        <Text size="lg" ta="center" maw={700}>
                            Though I don't get much time to draw and don't produce much each month,
                            charting my progress here is a great motivator to keep adding to it!
                        </Text>
                        <Text size="lg" ta="center" maw={700}>
                            Click any thumbnail to dive into process shots, notes, sometimes a timelapse and even the Clip Studio Paint file!
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
