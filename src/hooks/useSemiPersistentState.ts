import {Dispatch, SetStateAction, useEffect, useState} from "react";
import useAfterComponentMount from "@/hooks/useAfterComponentMount";
import useBeforeComponentMount from "@/hooks/useBeforeComponentMount";

const useSemiPersistentState = (key: string, initialState: string): [string, Dispatch<SetStateAction<string>>] => {
    const [value, setValue] = useState(initialState);

    useAfterComponentMount(() => {
        const item = localStorage.getItem(key);

        console.log('value from cache after component mount:', item);

        if (!item) return;

        setValue(item);
    }, []);

    useAfterComponentMount(() => {
        if(value === initialState) return;
        console.log(`local storage key '${key}' set to:`, value);
        localStorage.setItem(key, value);
    },[value, key]);

    return [value, setValue];
}

export default useSemiPersistentState;