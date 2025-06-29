import {Anchor, Container, Divider, Text, Title} from '@mantine/core';
import {Link} from 'react-router-dom';
import RimuuSection from '../components/artists/RimuuSection.jsx';
import SaiiviaSection from '../components/artists/SaiiviaSection.jsx';
import KuriNyannSection from '../components/artists/KuriNyannSection.jsx';
import KachoufuugetuSection from '../components/artists/KachoufuugetuSection.jsx';
import ResuSection from '../components/artists/ResuSection.jsx';
import FeintSection from '../components/artists/FeintSection.jsx';
import OrigamiSection from '../components/artists/OrigamiSection.jsx';

function Aspirations() {
    return (
        <Container size="xl" py="xl">
            <Title order={1} mb="xs">Artists I aspire to</Title>
            <Text mb="xl">
                This page lists some of the artists who I admire and specifically want to emulate as I develop my skills.
            </Text>

            <RimuuSection />

            <Divider my="xl" />

            <SaiiviaSection />

            <Divider my="xl" />

            <OrigamiSection />

            <Divider my="xl" />

            <KuriNyannSection />

            <Divider my="xl" />

            <KachoufuugetuSection />

            <Divider my="xl" />

            <Title order={1} mb="xs">Artists I admire for their love of a single character</Title>
            <Text mb="xl">
                There's something I really like about artists who go almost all-in on a single character,
                they're able to really bring out the charm of the character.
            </Text>

            <ResuSection />

            <Divider my="xl" />

            <FeintSection />

            <Divider my="xl" />

            <section>
                <Anchor component={Link} to="/">
                    ← Back to gallery
                </Anchor>
            </section>
        </Container>
    );
}

export default Aspirations;