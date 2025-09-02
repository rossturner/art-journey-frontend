import {SimpleGrid, Text} from '@mantine/core';
import ArtistSection from './ArtistSection.jsx';
import LinkedImage from '../LinkedImage.jsx';

function HongSection() {
    const socialLinks = [
        "https://x.com/HongBsWs",
        "https://www.pixiv.net/en/users/306422"
    ];

    return (
        <ArtistSection name="Hong / HongBsWs" socialLinks={socialLinks}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/hong1.png" />
                <LinkedImage src="/static/aspirations/hong2.png" />
                <LinkedImage src="/static/aspirations/hong3.png" />
                <LinkedImage src="/static/aspirations/hong4.png" />
            </SimpleGrid>

            <Text>
                Hong's work jumps out to me as particularly bold and colourful which I'm keen to try and learn from.
            </Text>
        </ArtistSection>
    );
}

export default HongSection;