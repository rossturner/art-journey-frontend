import {Anchor, Image} from '@mantine/core';

function LinkedImage({ src, radius = 'md', style = {}, ...rest }) {
    // spread the image to fill its flex-cell but allow callers to override
    const mergedStyle = { width: '100%', ...style };

    return (
        <Anchor href={src} target="_blank" rel="noopener noreferrer">
            <Image src={src} radius={radius} style={mergedStyle} {...rest} />
        </Anchor>
    );
}

export default LinkedImage;
