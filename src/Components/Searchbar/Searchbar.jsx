import {useState} from 'react';

export default function Searchbar({searchString, updateSearchString, buttonClick, placeholder}) {
    const [string, setString] = useState(searchString);

    const changeSearchString = (e) => {
        updateSearchString(e.target.value);
        setString(e.target.value);
    }

    const handlerClickButton = (e) => {
        e.preventDefault();
        buttonClick();
    }

    return(
        <>
            <form className="d-flex">
                <input className="form-control me-2 fs-5" type="search" placeholder={placeholder}
                       aria-label="Search" value={string}
                       onChange={changeSearchString}
                />
                <button className="btn btn-primary fs-5" type="submit" onClick={handlerClickButton}>Поиск</button>
            </form>
        </>
    )
}