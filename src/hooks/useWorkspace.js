import {useEffect, useState} from 'react';

export default function useWorkspace() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('/workspace/workspace-index.php')
            .then(r => r.json())
            .then(setData);
    }, []);
    return data;
}
