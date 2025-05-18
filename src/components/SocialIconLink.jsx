import {Anchor} from '@mantine/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {faBluesky, faPatreon, faPixiv, faXTwitter} from '@fortawesome/free-brands-svg-icons';

function SocialIconLink({ href }) {
    const url = href.toLowerCase();
    let icon = faGlobe;

    if (url.includes('patreon')) {
        icon = faPatreon;
    } else if (url.includes('bsky')) {
        icon = faBluesky;
    } else if (url.includes('pixiv')) {
        icon = faPixiv;
    } else if (url.includes('x.com') || url.includes('twitter.com')) {
        icon = faXTwitter;
    }

    return (
        <Anchor href={href} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={icon} size="lg" />
        </Anchor>
    );
}

export default SocialIconLink;