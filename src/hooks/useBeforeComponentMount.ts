import {useEffect, useRef} from "react";

export default function useBeforeComponentMount(callback: () => void, dependencies: any[] = []) {
    const didMount = useRef(false);

    useEffect(() => {
        if(!didMount.current) {
            callback();
            return;
        }

        didMount.current = true;
    }, dependencies);
}