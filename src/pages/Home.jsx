import {Container, Text} from '@mantine/core';
import ProjectGallery from '../components/ProjectGallery';

export default function Home() {
    return (
        <>
            {/* Intro / hero section */}
            <Container size="md" py="xl">
                <Text component="h1" fw={700} size="2rem" mb="sm">
                    Welcome to Ziedritz.art!
                </Text>
                <Text size="lg">
                    This site is my ongoing journal of studies, sketches and finished illustrations, tracking
                    my progress from absolute beginner when I started in September 2024 to now.
                </Text>
                <Text size="lg">
                    Click any thumbnail to dive into process shots, notes and timelapses.
                </Text>
            </Container>

            <ProjectGallery />
        </>
    );
}
