import React, { useState } from 'react';

const Search = (props) => {
    const [searchVal, setSearchVal] = useState("");

    const handleSearchInputChanges = (e) => {
        setSearchVal(e.target.value);
    }
    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchVal);
        setSearchVal("");
    }
    return (
        <form className="search">
            <input
                value={searchVal}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        </form>
    );

}

export default Search;