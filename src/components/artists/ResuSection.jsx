import {Blockquote, SimpleGrid, Text} from '@mantine/core';
import ArtistSection from './ArtistSection.jsx';
import LinkedImage from '../LinkedImage.jsx';

function ResuSection() {
    const socialLinks = [
        "https://resudesu.carrd.co/",
        "https://x.com/Resu_desu",
        "https://www.pixiv.net/en/users/13502343/artworks"
    ];

    return (
        <ArtistSection name="Resu / Resu desu / イラストレーター" socialLinks={socialLinks}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing="md"
                mb="sm"
            >
                <LinkedImage src="/static/aspirations/resu-kiara-sweat.jpg" />
                <LinkedImage src="/static/aspirations/resu-kiara-2.jpg" />
                <LinkedImage src="/static/aspirations/resu-kiara-3.jpg" />
                <LinkedImage src="/static/aspirations/resu-kiara-4.jpg" />
            </SimpleGrid>

            <Text>
                Resu is one of those artists seemingly obsessed with producing fanart of a single character (I respect that!),
                which makes me think of Bruce Lee's "10,000 kicks" quote applied to art:
            </Text>
            <Blockquote
                size="sm"
                mx="auto"
                pl="md"
                styles={(theme) => ({
                    root: {
                        paddingTop: theme.spacing.xs,
                        paddingBottom: theme.spacing.xs,
                    },
                })}
            >
                "I fear not the man who has drawn a thousand things once,
                but I fear the man who has drawn one thing a thousand times."
            </Blockquote>
            <Text>
                In Resu's case, a large amount of his work
                features <a href="https://virtualyoutuber.fandom.com/wiki/Takanashi_Kiara" target="_blank">Takanashi Kiara</a>,
                who is one of Hololive EN's VTubers. Before I was aware of who the character was, I was floored by
                the striking contrast between her warm-orange hair with teal-green "peekaboo" highlights, and the
                further contrast of this to her purple eyes. Resu consistently does a great job of depicting this,
                much better than most fanart I've seen of Kiara since discovering she actually has a massive following.
                It helps that I think Kiara's character design is phoenomenal, the mix of orange and teal hair with purple eyes.<br />
                <br />
                Resu also has produced a number of fantastic backgrounds which will be of interest when I actually
                get around to thinking more about backgrounds. Long term I'm likely to go down the route of making
                a visual novel and his work is perfect for that, though I believe most of it is commissions for
                vtubers to use as stream backgrounds.
            </Text>
        </ArtistSection>
    );
}

export default ResuSection;