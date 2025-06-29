import {SimpleGrid, Text} from '@mantine/core';
import ArtistSection from './ArtistSection.jsx';
import LinkedImage from '../LinkedImage.jsx';

function OrigamiSection() {
    const socialLinks = [
        "https://x.com/Origami_0703",
        "https://www.pixiv.net/en/users/16800437"
    ];

    return (
        <ArtistSection name="Origami" socialLinks={socialLinks}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/origami-belle.jpeg" alt="Belle by Origami" />
                <LinkedImage src="/static/aspirations/origami-cypher.jpeg" alt="Cypher by Origami" />
                <LinkedImage src="/static/aspirations/origami-firefly.jpeg" alt="Firefly by Origami" />
                <LinkedImage src="/static/aspirations/origami-vivian.jpeg" alt="Vivian by Origami" />
            </SimpleGrid>

            <Text>
                Origami's work is close to an ideal style for me. Zooming into the eys shows the level of
                detail I want to incorporate into eyelashes. One that I think I'll try and do some "master studies"
                of to see if I can learn what makes it work.<br />
                <br />
                Origami has a fanbox that I've subscribed to but unfortunately this only unlocks NSFW images and a couple
                of Live2D animations (which I'd like to get into eventually) but no process images or PSD files for me
                to try and study. They post very little on social media other than these finished images and promote
                their fanbox, but don't say much more than that. Though those are hallmarks of someone using AI, I don't
                believe that is the case here. There's a WIP flat colour post of the Belle swimsuit image but nothing
                beyond that unfortunately.
            </Text>
        </ArtistSection>
    );
}

export default OrigamiSection;