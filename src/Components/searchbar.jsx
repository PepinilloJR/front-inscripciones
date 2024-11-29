import "./searchbar.css"
import { BsSearch } from "react-icons/bs";


function SearchBar(){

    return <div className="SearchBarContainer" >
        <input className="SearchBar" placeholder="Buscar materia..."></input>
        <BsSearch className="SearchIcon"></BsSearch>
    </div>
}


export default SearchBar