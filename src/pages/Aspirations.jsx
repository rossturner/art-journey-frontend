import {Container, Divider, Group, Stack, Text, Title} from '@mantine/core';
import SocialIconLink from "../components/SocialIconLink.jsx";
import LinkedImage from "../components/LinkedImage.jsx";

function Aspirations() {
    return (
        <Container size="xl" py="xl">
            <Title order={1} mb="xs">Artists I aspire to</Title>
            <Text mb="xl">
                This page lists some of the artists who I admire and specifically want to emulate as I develop my skills.
            </Text>

            <Stack spacing="xl">
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
                    <Group spacing="md" mb="sm">
                        <LinkedImage src="/static/aspirations/rimuu-school.png" alt="Rimuu OC" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/rimuu-marin.png" alt="Marin Kitagawa by Rimuu" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/rimuu-nicole.png" alt="Nicole Demara by Rimuu" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/rimuu-ellen.png" alt="Ellen Joe by Rimuu" radius="md" maw={300} />
                    </Group>
                    <Text>I think what initially got me to focus on Rimuu's work is simply that her OC has pink hair,
                        which is my favourite!<br/>
                        <br/>
                        I probably came across her illustration of Nicole Demara from Zenless Zone Zero (third image
                        above)
                        who is my current favourite character, and started following from there.
                        I love how she colours hair with subtle stands of darker and lighter shades, and I think she
                        makes fantastic use
                        of subtle reflected light and sub-surface scattering:<br/>
                        - See the blue/purple reflections on the right of the 1st image in the hair, shirt and
                        skirt<br/>
                        - The skintone used in the hair around the face on the 4th pic, also the reflected blue light
                        coming from the right side of that image<br/>
                        <br/>
                        All of the above have the main light source from the
                        upper-left and I especially like how this applies to the first two images, including how it
                        "removes"/recolours the
                        lineart there which is otherwise present on the rest of the illustration.
                        All of these have the character almost fill the frame but I really like what is done with the
                        backgrounds to pull focus to the character
                        while also informing the scene.<br/>
                        <br/>
                        Rimuu is probably the best all-round example of the kind of artist I'd like to be,
                        though the style of her work is a little more cutesy than I would probably produce myself.
                    </Text>
                </section>

                <Divider />

                {/* Saiivia */}
                <section>
                    <Title order={2} mb="sm">Saiivia</Title>
                    <Group spacing="xs" mb="sm">
                        <SocialIconLink href="https://linktr.ee/saiivia" />
                        <SocialIconLink href="https://bsky.app/profile/saiivia.bsky.social" />
                        <SocialIconLink href="https://x.com/Saiivia_" />
                        <SocialIconLink href="https://www.pixiv.net/en/users/72716458" />
                    </Group>
                    <Group spacing="md" mb="sm">
                        <LinkedImage src="/static/aspirations/saiivia-anby.jpg" alt="Anby Demara by Saiivia" radius="md" maw={400} />
                        <LinkedImage src="/static/aspirations/saiivia-jane.jpg" alt="Jane Doe by Saiivia" radius="md" maw={400} />
                        <LinkedImage src="/static/aspirations/saiivia-driving-thunder.jpg" alt="Driving Thunder by Saiivia" radius="md" maw={400} />
                    </Group>
                    <Group spacing="md" mb="sm">
                        <LinkedImage src="/static/aspirations/saiivia-carlotta.jpg" alt="Artwork by Saiivia 2" radius="md" maw={600} />
                        <LinkedImage src="/static/aspirations/saiivia-astra.jpg" alt="Artwork by Saiivia 2" radius="md" maw={600} />
                    </Group>
                    <Text>I fell in love with Saiivia's work upon seeing this 1st image of Anby from ZZZ because I've simply never
                    seen a depiction like this. So... soft? Gentle? I still can't explain what draws me to this work so much
                    but one thing that does stand out is the way Saiivia draws her eyes. Maybe something to do with the pupil
                    being hinted at rather than boldly different to the colouring to the iris? Maybe it's simply that the pupil
                    is coloured similarly to the iris and the iris is IMO the most important focal point in a stylized illustration.<br />
                    <br />
                    Other than that, I notice Saiivia makes really good use of midtones between lit and shaded areas - most evident
                    on Astra's leg in the final image.</Text>
                </section>

                <Divider />

                {/* Resu */}
                <section>
                    <Title order={2} mb="sm">Resu</Title>
                    <Group spacing="xs" mb="sm">
                        <SocialIconLink href="https://resudesu.carrd.co/" />
                    </Group>
                    <Group spacing="md" mb="sm">
                        <LinkedImage src="/static/aspirations/resu1.jpg" alt="Artwork by Resu 1" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/resu2.jpg" alt="Artwork by Resu 2" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/resu3.jpg" alt="Artwork by Resu 3" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/resu4.jpg" alt="Artwork by Resu 4" radius="md" maw={300} />
                    </Group>
                    <Text>TODO: Note the aspects of Resu’s work you’d like to emulate.</Text>
                </section>

                <Divider />

                {/* Kachoufuugetu4 */}
                <section>
                    <Title order={2} mb="sm">Kachoufuugetu4</Title>
                    <Group spacing="xs" mb="sm">
                        <SocialIconLink href="https://bsky.app/profile/kachoufuugetu4.bsky.social" />
                        <SocialIconLink href="https://www.pixiv.net/en/users/1809221" />
                    </Group>
                    <Group spacing="md" mb="sm">
                        <LinkedImage src="/static/aspirations/kachou1.jpg" alt="Artwork by Kachoufuugetu4 1" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/kachou2.jpg" alt="Artwork by Kachoufuugetu4 2" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/kachou3.jpg" alt="Artwork by Kachoufuugetu4 3" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/kachou4.jpg" alt="Artwork by Kachoufuugetu4 4" radius="md" maw={300} />
                    </Group>
                    <Text>TODO: Outline what elements of Kachoufuugetu4’s pieces you want to capture.</Text>
                </section>

                <Divider />

                {/* Feintheart */}
                <section>
                    <Title order={2} mb="sm">Feintheart</Title>
                    <Group spacing="xs" mb="sm">
                        <SocialIconLink href="https://www.pixiv.net/en/users/46954526" />
                    </Group>
                    <Group spacing="md" mb="sm">
                        <LinkedImage src="/static/aspirations/feintheart1.jpg" alt="Artwork by Feintheart 1" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/feintheart2.jpg" alt="Artwork by Feintheart 2" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/feintheart3.jpg" alt="Artwork by Feintheart 3" radius="md" maw={300} />
                        <LinkedImage src="/static/aspirations/feintheart4.jpg" alt="Artwork by Feintheart 4" radius="md" maw={300} />
                    </Group>
                    <Text>TODO: Write about why Feintheart’s approach inspires you.</Text>
                </section>
            </Stack>
        </Container>
    );
}

export default Aspirations;