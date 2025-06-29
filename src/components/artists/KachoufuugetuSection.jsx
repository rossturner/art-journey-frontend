import {SimpleGrid, Text} from '@mantine/core';
import ArtistSection from './ArtistSection.jsx';
import LinkedImage from '../LinkedImage.jsx';

function KachoufuugetuSection() {
    const socialLinks = [
        "https://bsky.app/profile/kachoufuugetu4.bsky.social",
        "https://x.com/kachoufuugetu4",
        "https://www.pixiv.net/en/users/1809221"
    ];

    return (
        <ArtistSection name="Kachoufuugetu4 / 三ッ葉 稔" socialLinks={socialLinks}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/kachou1.jpg" />
                <LinkedImage src="/static/aspirations/kachou2.jpg" />
                <LinkedImage src="/static/aspirations/kachou3.jpg" />
                <LinkedImage src="/static/aspirations/kachou4.jpg" />
            </SimpleGrid>

            <Text>This is a very NSFW manga artist and most of his coloured work appears to be skeb commissions.
                Looking at these you're probably seeing a theme of obvious things (or pairs of obvious things)
                but I swear that's not why this artist is included!
                Honestly(!) I'm including his work for a similar reason to Saiivia's - I love the way he draws and colours eyes.
                Maybe it's just the wide-eyed happy expression he commonly uses along with the way they're coloured,
                but they really stand out to me enough to list him as an artist I want to include here.</Text>
        </ArtistSection>
    );
}

export default KachoufuugetuSection;