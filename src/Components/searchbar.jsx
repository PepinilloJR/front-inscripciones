import { useContext, useEffect, useRef, useState } from "react";
import "./searchbar.css"
import { BsSearch } from "react-icons/bs";


function SearchBar({ContentSetter, Placeholder}){

    // la searchBar toma un Estado setter con el que guarda su contenido al cambiar, y un placeholder para mostrar

    const [searchbarChanged, setSearchbarChanged] = useState(false)
    const SearchBarRef = useRef("")

    useEffect(() => {   
        ContentSetter(SearchBarRef.current.value)
    }, [searchbarChanged])

    return <div className="SearchBarContainer" >
        <input onChange={() => {
            setSearchbarChanged(!searchbarChanged)
        }} ref={SearchBarRef} className="SearchBar" placeholder={Placeholder}></input>
        <BsSearch className="SearchIcon"></BsSearch>
    </div>
}


export default SearchBar