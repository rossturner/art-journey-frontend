import {Anchor, Blockquote, Container, Divider, Group, Text, Title} from '@mantine/core';
import SocialIconLink from '../components/SocialIconLink.jsx';
import LinkedImage from '../components/LinkedImage.jsx';
import {Link} from "react-router-dom";

function Aspirations() {
    return (
        <Container size="xl" py="xl">
            <Title order={1} mb="xs">Artists I aspire to</Title>
            <Text mb="xl">
                This page lists some of the artists who I admire and specifically want to emulate as I develop my skills.
            </Text>

            {/* Rimuu */}
            <section>
                <Title order={2} mb="sm">Rimuu</Title>
                <Group spacing="xs" mb="sm">
                    <SocialIconLink href="https://www.rimuu.com/socials" />
                    <SocialIconLink href="https://bsky.app/profile/rimuurin.bsky.social" />
                    <SocialIconLink href="https://x.com/rimuurin" />
                    <SocialIconLink href="https://www.pixiv.net/en/users/17317073" />
                    <SocialIconLink href="https://www.patreon.com/rimuu" />
                </Group>

                <Group spacing="md" mb="sm" wrap="nowrap" grow>
                    <LinkedImage src="/static/aspirations/rimuu-school.png" alt="Rimuu OC" />
                    <LinkedImage src="/static/aspirations/rimuu-marin.png" alt="Marin Kitagawa by Rimuu" />
                    <LinkedImage src="/static/aspirations/rimuu-nicole.png" alt="Nicole Demara by Rimuu" />
                    <LinkedImage src="/static/aspirations/rimuu-ellen.png" alt="Ellen Joe by Rimuu" />
                </Group>

                <Text>
                    I think what initially got me to focus on Rimuu's work is simply that her OC has pink hair,
                    which is my favourite!<br />
                    <br />
                    I probably came across her illustration of Nicole Demara from Zenless Zone Zero (third image above)
                    who is my current favourite character, and started following from there.<br />
                    I love how she colours hair with subtle strands of darker and lighter shades, and I think she makes
                    fantastic use of subtle reflected light and sub-surface scattering:<br />
                    – See the blue/purple reflections on the right of the 1st image in the hair, shirt and skirt<br />
                    – The skintone used in the hair around the face on the 4th pic, also the reflected blue light coming
                    from the right side of that image<br />
                    <br />
                    All of the above have the main light source from the upper-left and I especially like how this
                    applies to the first two images, including how it “removes”/recolours the line-art there which is
                    otherwise present on the rest of the illustration.<br />
                    All of these have the character almost fill the frame but I really like what is done with the
                    backgrounds to pull focus to the character while also informing the scene.<br />
                    <br />
                    Rimuu is probably the best all-round example of the kind of artist I'd like to be, though the style
                    of her work is a little more cutesy than I would probably produce myself.
                </Text>
            </section>

            <Divider my="xl" />

            {/* Saiivia */}
            <section>
                <Title order={2} mb="sm">Saiivia</Title>
                <Group spacing="xs" mb="sm">
                    <SocialIconLink href="https://linktr.ee/saiivia" />
                    <SocialIconLink href="https://bsky.app/profile/saiivia.bsky.social" />
                    <SocialIconLink href="https://x.com/Saiivia_" />
                    <SocialIconLink href="https://www.youtube.com/@Saiivia/" />
                </Group>

                <Group spacing="md" mb="sm" wrap="nowrap" grow>
                    <LinkedImage src="/static/aspirations/saiivia-anby.jpg" alt="Anby Demara by Saiivia" />
                    <LinkedImage src="/static/aspirations/saiivia-jane.jpg" alt="Jane Doe by Saiivia" />
                    <LinkedImage src="/static/aspirations/saiivia-driving-thunder.jpg" alt="Driving Thunder by Saiivia" />
                </Group>

                <Group spacing="md" mb="sm" wrap="nowrap" grow>
                    <LinkedImage src="/static/aspirations/saiivia-carlotta.jpg" alt="Carlotta by Saiivia" />
                    <LinkedImage src="/static/aspirations/saiivia-astra.jpg" alt="Astra by Saiivia" />
                </Group>

                <Text>
                    I fell in love with Saiivia's work upon seeing this 1st image (Anby from ZZZ) because I've simply
                    never seen a depiction of that character like this. So… soft? Gentle?<br />
                    <br />
                    I still can't explain what draws me to this work so much but one thing that does stand out is the
                    way Saiivia draws her eyes. Maybe something to do with the pupil being hinted at rather than boldly
                    different to the colouring of the iris?<br />
                    <br />
                    Other than that, I notice Saiivia often makes great use of midtones between lit and shaded areas —
                    most evident on Astra's leg in the final image or Anby's shoulder in the 1st image.
                </Text>
            </section>

            <Divider my="xl" />

            {/* Resu */}
            <section>
                <Title order={2} mb="sm">Resu / Resu desu / イラストレーター</Title>
                <Group spacing="xs" mb="sm">
                    <SocialIconLink href="https://resudesu.carrd.co/" />
                    <SocialIconLink href="https://x.com/Resu_desu" />
                    <SocialIconLink href="https://www.pixiv.net/en/users/13502343/artworks" />
                </Group>

                <Group spacing="md" mb="sm" wrap="nowrap" grow>
                    <LinkedImage src="/static/aspirations/resu-kiara-sweat.jpg" />
                    <LinkedImage src="/static/aspirations/resu-kiara-2.jpg" />
                    <LinkedImage src="/static/aspirations/resu-kiara-3.jpg" />
                    <LinkedImage src="/static/aspirations/resu-mumei.jpg" />
                </Group>

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
                    “I fear not the man who has drawn a thousand things once,
                    but I fear the man who has drawn one thing a thousand times.”
                </Blockquote>
                <Text>
                    In Resu's case, a large amount of his work
                    features <a href="https://virtualyoutuber.fandom.com/wiki/Takanashi_Kiara" target="_blank">Takanashi Kiara</a>,
                    who is one of Hololive EN's VTubers. Before I was aware of who the character was, I was floored by
                    the striking contrast between her warm-orange hair with teal-green "peekaboo" highlights, and the
                    further contrast of this to her purple eyes. Resu consistently does a great job of depicting this,
                    much better than most fanart I've seen of Kiara since discovering she actually has a massive following.<br />
                    <br />
                    Resu also has produced a number of fantastic backgrounds which will be of interest when I actually
                    get around to thinking more about backgrounds. Long term I'm likely to go down the route of making
                    a visual novel and his work is perfect for that, though I believe most of it is commissions for
                    vtubers to use as stream backgrounds.
                </Text>
            </section>

            <Divider my="xl" />

            {/* Kachoufuugetu4 */}
            <section>
                <Title order={2} mb="sm">Kachoufuugetu4 / 三ッ葉　稔</Title>
                <Group spacing="xs" mb="sm">
                    <SocialIconLink href="https://bsky.app/profile/kachoufuugetu4.bsky.social" />
                    <SocialIconLink href="https://x.com/kachoufuugetu4" />
                    <SocialIconLink href="https://www.pixiv.net/en/users/1809221" />
                </Group>

                <Group spacing="md" mb="sm" wrap="nowrap" grow>
                    <LinkedImage src="/static/aspirations/kachou1.jpg" />
                    <LinkedImage src="/static/aspirations/kachou2.jpg" />
                    <LinkedImage src="/static/aspirations/kachou3.jpg" />
                    <LinkedImage src="/static/aspirations/kachou4.jpg" />
                </Group>

                <Text>This is a very NSFW manga artist and most of his coloured work appears to be skeb commissions.
                    Looking at these you're probably seeing a theme of obvious things (or pairs of obvious things)
                    but I swear that's not why this artist is included!
                    Honestly(!) I'm including his work for a similar reason to Saiivia's - I love the way he draws and colours eyes.
                    Maybe it's just the wide-eyed happy expression he commonly uses along with the way they're coloured,
                    but they really stand out to me enough to list him as an artist I want to include here.</Text>
            </section>

            <Divider my="xl" />

            {/* Feintheart */}
            <section>
                <Title order={2} mb="sm">Feint / Feintheart721</Title>
                <Group spacing="xs" mb="sm">
                    <SocialIconLink href="https://x.com/FeintHeart721" />
                    <SocialIconLink href="https://www.pixiv.net/en/users/46954526" />
                    <SocialIconLink href="https://www.patreon.com/feint721" />
                </Group>

                <Group spacing="md" mb="sm" wrap="nowrap" grow>
                    <LinkedImage src="/static/aspirations/feint1.jpg" />
                    <LinkedImage src="/static/aspirations/feint2.jpg" />
                    <LinkedImage src="/static/aspirations/feint3.jpg" />
                    <LinkedImage src="/static/aspirations/feint4.jpg" />
                </Group>

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
            </section>

            <Divider my="xl" />

            <section>
                <Anchor component={Link} to="/">
                    ← Back to gallery
                </Anchor>
            </section>
        </Container>
    );
}

export default Aspirations;
