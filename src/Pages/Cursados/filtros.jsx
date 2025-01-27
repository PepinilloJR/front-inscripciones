import { useContext } from "react"
import { CurContext } from "../../Context/Context"

import { BiMenuAltLeft } from "react-icons/bi"
import SearchBar from "../../Components/searchbar"


function CursadosFiltrosSection() {
    const { setOptionsSelected, optionsSelected, setFiltro } = useContext(CurContext)

    return <div className="FiltrosSection">
    <div className='FiltroBox'>
        <button onClick={()=> {setOptionsSelected(!optionsSelected)}} className={optionsSelected ? 'SearchFilterButtonSelected' : "SearchFilterButton"} >
            <BiMenuAltLeft style={{fontSize: "calc(2vw + 2vh)"}}></BiMenuAltLeft>
        </button>
        <div className='SearchFilterBox'></div>
        <SearchBar ContentSetter={setFiltro} Placeholder={"1k1, juan, analisis..."}></SearchBar>

    </div>
    <div className={optionsSelected ? 'SearchFilterOptions' : 'SearchFilterOptionsClosed'}>
            
            Opciones de busqueda
            <label className='Selector'>
                <input defaultChecked={true} onChange={(e) => {
                }} type="checkbox"></input>
                Materias
            </label>
            <label  className='Selector'>
                <input defaultChecked={true} onChange={(e) => {
                }} type="checkbox"></input>
                Comisiones
            </label>
            <label className='Selector'>
                <input defaultChecked={true} onChange={(e) => {

                }} type="checkbox"></input>
                Alumnos
            </label>
    </div>

    <div className='FiltroBox'>
        <div className='FiltrosList'>
            Filtros
            <label className='Filtro'>
            {"Año: "} 
            <select>
                <option value="2025">2025</option>
            </select>
            </label>
        </div>
    </div>

</div>
}


export default CursadosFiltrosSection