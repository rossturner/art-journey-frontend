import {Anchor, Image} from '@mantine/core';

function LinkedImage({ src, radius = 'md', ...rest }) {
    // spread the image to fill its flex-cell but allow callers to override

    return (
        <Anchor href={src} target="_blank" rel="noopener noreferrer">
            <Image src={src} radius={radius} {...rest} />
        </Anchor>
    );
}

export default LinkedImage;
