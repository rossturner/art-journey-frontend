import {SimpleGrid, Text} from '@mantine/core';
import ArtistSection from './ArtistSection.jsx';
import LinkedImage from '../LinkedImage.jsx';

function SaiiviaSection() {
    const socialLinks = [
        "https://linktr.ee/saiivia",
        "https://bsky.app/profile/saiivia.bsky.social",
        "https://x.com/Saiivia_",
        "https://www.youtube.com/@Saiivia/"
    ];

    return (
        <ArtistSection name="Saiivia" socialLinks={socialLinks}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/saiivia-anby.jpg" alt="Anby Demara by Saiivia" />
                <LinkedImage src="/static/aspirations/saiivia-jane.jpg" alt="Jane Doe by Saiivia" />
                <LinkedImage src="/static/aspirations/saiivia-nicole-commission.jpg" alt="Nicole Demara by Saiivia" />
            </SimpleGrid>

            <SimpleGrid
                cols={{ base: 1, sm: 2 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/saiivia-carlotta.jpg" alt="Carlotta by Saiivia" />
                <LinkedImage src="/static/aspirations/saiivia-astra.jpg" alt="Astra by Saiivia" />
            </SimpleGrid>

            <Text>
                I fell in love with Saiivia's work upon seeing this 1st image (Anby from ZZZ) because I've simply
                never seen a depiction of that character like this. So… soft? Gentle?<br />
                <br />
                I still can't explain what draws me to this work so much but one thing that does stand out is the
                way Saiivia draws her eyes. Maybe something to do with the pupil being hinted at rather than boldly
                different to the colouring of the iris? Maybe its the lack of weight in the lineart?<br />
                <br />
                Other than that, I notice Saiivia often makes great use of midtones between lit and shaded areas —
                most evident on Astra's leg in the final image or Anby's shoulder in the 1st image.
            </Text>
        </ArtistSection>
    );
}

export default SaiiviaSection;