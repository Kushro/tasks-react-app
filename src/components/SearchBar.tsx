import {ChangeEvent, useRef} from "react";
import InputWithLabel from "@/components/InputWithLabel";

type SearchBarProps = {
    search: string;
    searchHandler: (term: string) => void;
}

const SearchBar = ({search, searchHandler}: SearchBarProps) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => searchHandler(event.target.value);

    return (
        <div className="search-wrapper">
            <InputWithLabel id='search-bar' value={search} onInputChange={onChange} type='text' placeholder='Search Task!'>
                <p>Search:</p>
            </InputWithLabel>
        </div>
    )
}

export default SearchBar;