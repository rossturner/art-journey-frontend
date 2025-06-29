import {SimpleGrid, Text} from '@mantine/core';
import ArtistSection from './ArtistSection.jsx';
import LinkedImage from '../LinkedImage.jsx';

function FeintSection() {
    const socialLinks = [
        "https://x.com/FeintHeart721",
        "https://www.pixiv.net/en/users/46954526",
        "https://www.patreon.com/feint721"
    ];

    return (
        <ArtistSection name="Feint / Feintheart721" socialLinks={socialLinks}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/feint1.jpg" />
                <LinkedImage src="/static/aspirations/feint2.jpg" />
                <LinkedImage src="/static/aspirations/feint3.jpg" />
                <LinkedImage src="/static/aspirations/feint4.jpg" />
            </SimpleGrid>

            <Text>Similarly to Resu mostly focusing on one character, Feint takes that even further as his profile
            text informs you with "99.1% Stelle" (Stelle being the grey-haired, yellow-eyed female player
            avatar/protaganist from Honkai: Star Rail).<br />
            <br />
            I struggle to define what it is that draws me to Feint's work, I think it might actually be the more
            "sketchy" look to his work where it looks like he's coloured a sketch and not bothered neatening it up
            with lineart (or more likely that the "lineart" is a neatened sketch over a rougher sketch).<br />
            <br />
            It might even just be that I have such respect for someone who almost entirely focuses on making art
            of a single character over months and years!<br />
            (He does also make great art of other characters)</Text>
        </ArtistSection>
    );
}

export default FeintSection;