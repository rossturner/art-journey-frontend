import {Anchor, Container, Divider, Text, Title} from '@mantine/core';
import {Link} from 'react-router-dom';
import RimuuSection from '../components/artists/RimuuSection.jsx';
import SaiiviaSection from '../components/artists/SaiiviaSection.jsx';
import KachoufuugetuSection from '../components/artists/KachoufuugetuSection.jsx';
import FeintSection from '../components/artists/FeintSection.jsx';
import NekojiraSection from '../components/artists/NekojiraSection.jsx';

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

            <NekojiraSection />

            <Divider my="xl" />

            <KachoufuugetuSection />

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