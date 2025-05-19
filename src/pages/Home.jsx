import {Box, Container, Group, Stack, Text, Title} from '@mantine/core';
import ProjectGallery from '../components/ProjectGallery';
import SocialIconLink from "../components/SocialIconLink.jsx";

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
                        <Group spacing="xs" mb="sm">
                            <SocialIconLink href="https://bsky.app/profile/ziedritz.art" />
                            <SocialIconLink href="https://x.com/ZiedritzArt" />
                        </Group>
                    </Stack>
                    <Stack spacing="sm">
                        <Text size="lg">
                            This site is my journal of studies, sketches and finished illustrations,
                            charting progress from absolute beginner (September 2024) to today.
                        </Text>
                        <Text size="lg">
                            Though I don't get much time to draw and don't produce much each month,
                            charting my progress here is a great motivator to keep adding to it!
                        </Text>
                        <Text size="lg">
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
