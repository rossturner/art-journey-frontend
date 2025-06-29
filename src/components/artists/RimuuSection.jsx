import {SimpleGrid, Text} from '@mantine/core';
import ArtistSection from './ArtistSection.jsx';
import LinkedImage from '../LinkedImage.jsx';

function RimuuSection() {
    const socialLinks = [
        "https://www.rimuu.com",
        "https://bsky.app/profile/rimuurin.bsky.social",
        "https://x.com/rimuurin",
        "https://www.pixiv.net/en/users/17317073",
        "https://www.patreon.com/rimuu"
    ];

    return (
        <ArtistSection name="Rimuu" socialLinks={socialLinks}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/rimuu-school.png" alt="Rimuu OC" />
                <LinkedImage src="/static/aspirations/rimuu-ai.jpg" alt="Ai Hoshino by Rimuu" />
                <LinkedImage src="/static/aspirations/rimuu-nicole.png" alt="Nicole Demara by Rimuu" />
                <LinkedImage src="/static/aspirations/rimuu-ellen.png" alt="Ellen Joe by Rimuu" />
            </SimpleGrid>

            <Text>
                I think what initially got me to focus on Rimuu's work is simply that her OC has pink hair,
                which is my favourite!<br />
                <br />
                I probably came across her illustration of Nicole Demara from Zenless Zone Zero (third image above)
                who is my current favourite character, and started following from there.<br />
                I love how she colours hair with subtle strands of darker and lighter shades, and I think she makes
                fantastic use of subtle reflected light and sub-surface scattering:<br />
                – See the blue/purple reflections on the right of the 1st image in the hair, shirt and skirt<br />
                – The skintone scattering into the hair around the face, more obvious on the pieces with darker hair<br />
                <br />
                I especially like how the lighting applies to the hair in the first image- how it
                "removes"/recolours the line-art there which is
                otherwise present on the rest of the illustration.<br />
                All of these have the character almost fill the frame but I really like what is done with the
                backgrounds to pull focus to the character while also informing the scene, especially the
                use of depth-of-field in the first 3.<br />
                <br />
                Rimuu is probably the best all-round example of the kind of artist I'd like to be, though the style
                of her other work is often more cutesy than I would probably produce myself.
            </Text>
        </ArtistSection>
    );
}

export default RimuuSection;