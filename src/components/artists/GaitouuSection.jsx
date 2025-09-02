import {SimpleGrid, Text} from '@mantine/core';
import ArtistSection from './ArtistSection.jsx';
import LinkedImage from '../LinkedImage.jsx';

function GaitouuSection() {
    const socialLinks = [
        "https://x.com/gaitoou",
        "https://www.pixiv.net/en/users/13532185"
    ];

    return (
        <ArtistSection name="gaitoou" socialLinks={socialLinks}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/gaitoou1.png" />
                <LinkedImage src="/static/aspirations/gaitoou2.png" />
                <LinkedImage src="/static/aspirations/gaitoou3.png" />
                <LinkedImage src="/static/aspirations/gaitoou4.png" />
            </SimpleGrid>

            <Text>
                gaitoou's work is a more recent discovery to me than the other artists on here, but I love how they
                convey texture of materials and their lighting. Even better, they've shared a little insight into their
                process on Fanbox which I'm keen to review.
            </Text>
        </ArtistSection>
    );
}

export default GaitouuSection;