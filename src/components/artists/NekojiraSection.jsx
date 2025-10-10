import {SimpleGrid, Text} from '@mantine/core';
import ArtistSection from './ArtistSection.jsx';
import LinkedImage from '../LinkedImage.jsx';

function NekojiraSection() {
    const socialLinks = [
        "https://x.com/Nekojira",
        "https://www.fanbox.cc/@nekojira"
    ];

    return (
        <ArtistSection name="Nekojira" socialLinks={socialLinks}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/nekojira1.jpg" />
                <LinkedImage src="/static/aspirations/nekojira2.jpg" />
                <LinkedImage src="/static/aspirations/nekojira3.jpg" />
                <LinkedImage src="/static/aspirations/nekojira4.jpg" />
            </SimpleGrid>

            <Text>
                I only really came across Nekojira by working through his "From Shapes to Characters" Coloso course.
                Initially I wasn't entirely sold on this style but then it grew on me and more than that his process
                both seems very simple and able to work miracles so I'm very interested in learning everything I can.
                He is a little nervous in his course but ends up explaining his thought process and core principles very
                well rather than just exactly what he is doing to achieve these results, and I think I can learn a lot from that.<br />
                <br />
                Also he designed Raora Panthera of Hololive English!
            </Text>
        </ArtistSection>
    );
}

export default NekojiraSection;