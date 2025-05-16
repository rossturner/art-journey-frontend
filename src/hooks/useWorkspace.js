import {useEffect, useState} from 'react';
import example from '../assets/example-workspace.json';

export default function useWorkspace() {
    const [data, setData] = useState(null);
    useEffect(() => {
        // fetch('assets/example-workspace.json')
        //     .then(r => r.json())
        //     .then(setData);
        setData(example);
    }, []);
    return data;
}
