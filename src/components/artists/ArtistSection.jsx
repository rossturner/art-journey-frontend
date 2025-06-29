import {Group, Title} from '@mantine/core';
import SocialIconLink from '../SocialIconLink.jsx';

function ArtistSection({ name, socialLinks, children }) {
    return (
        <section>
            <Title order={2} mb="sm">{name}</Title>
            <Group spacing="xs" mb="sm">
                {socialLinks.map((link, index) => (
                    <SocialIconLink key={index} href={link} />
                ))}
            </Group>
            {children}
        </section>
    );
}

export default ArtistSection;