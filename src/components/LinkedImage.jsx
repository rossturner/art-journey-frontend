// src/components/LinkedImage.jsx
import {Anchor, Image} from '@mantine/core';

function LinkedImage(props) {
    const { src } = props;

    return (
        <Anchor href={src} target="_blank" rel="noopener noreferrer">
            <Image {...props} />
        </Anchor>
    );
}

export default LinkedImage;
