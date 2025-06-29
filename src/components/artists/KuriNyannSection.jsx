import {SimpleGrid, Text} from '@mantine/core';
import ArtistSection from './ArtistSection.jsx';
import LinkedImage from '../LinkedImage.jsx';

function KuriNyannSection() {
    const socialLinks = [
        "https://kurinyann.com/",
        "https://bsky.app/profile/did:plc:abwcwje7wcdejgxrc5vjxylr",
        "https://twitter.com/kuri_nyann",
        "http://kurinyann.etsy.com"
    ];

    return (
        <ArtistSection name="Kuri Nyann" socialLinks={socialLinks}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/kurinyann-jane-doe.jpg" alt="Jane Doe by Kuri Nyann" />
                <LinkedImage src="/static/aspirations/kurinyann-mumei.jpg" alt="Mumei by Kuri Nyann" />
                <LinkedImage src="/static/aspirations/kurinyann-megu.jpg" alt="Megu by Kuri Nyann" />
                <LinkedImage src="/static/aspirations/kurinyann-fwbathsuit.png" alt="Firewatch Character by Kuri Nyann" />
            </SimpleGrid>

            <Text mb="sm">
                Kuri Nyann's work reminds me a lot of Rimuu's and I came across them because they're both affiliated
                with the same merch reseller, but even before starting my art journey I'd seen Kuri's Jane Done piece
                above because they made a really detailed colouring tutorial for it. Similarly, Kuri puts out a LOT
                of great little tutorials for free, plus little shorts of their process on Twitter/X which I love to
                see.
            </Text>
        </ArtistSection>
    );
}

export default KuriNyannSection;