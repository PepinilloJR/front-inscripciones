import { useContext, useEffect, useState } from "react"
import { CurContext } from "../../Context/Context"
import {DeterminateNewYears} from "../../Services/useful"
import { BiMenuAltLeft } from "react-icons/bi"
import SearchBar from "../../Components/searchbar"


function CursadosFiltrosSection() {
    const { setOptionsSelected, optionsSelected, setFiltro,
        optionMateria,
        setOptionMateria,
        optionCurso,
        setOptionCurso,
        optionAlumno,
        setOptionAlumno,
        optionYear,
        setOptionYear } = useContext(CurContext)

    const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState(3) 
    


    return <div className="Section">
    <div className='FiltroBox'>
        <button onClick={()=> {setOptionsSelected(!optionsSelected)}} className={optionsSelected ? 'SearchFilterButtonSelected' : "SearchFilterButton"} >
            <BiMenuAltLeft style={{fontSize: "calc(2vw + 2vh)"}}></BiMenuAltLeft>
        </button>
        <div className='SearchFilterBox'></div>
        <SearchBar ContentSetter={setFiltro} Placeholder={"1k1, juan, analisis..."}></SearchBar>

    </div>
    <div className={optionsSelected ? 'SearchFilterOptions' : 'SearchFilterOptionsClosed'}>
            
            Opciones de busqueda
            <label className='Checkbox'>
                <input defaultChecked={true} onChange={(e) => {
                    setOptionMateria(!optionMateria)
                    if (optionMateria) {
                        setOpcionesSeleccionadas(opcionesSeleccionadas - 1)
                    } else {
                        setOpcionesSeleccionadas(opcionesSeleccionadas + 1)
                    }

                }} type="checkbox" disabled={opcionesSeleccionadas === 1 && optionMateria}></input>
                Materias
            </label>
            <label  className='Checkbox'>
                <input defaultChecked={true} onChange={(e) => {
                    setOptionCurso(!optionCurso)
                    if (optionCurso) {
                        setOpcionesSeleccionadas(opcionesSeleccionadas - 1)
                    } else {
                        setOpcionesSeleccionadas(opcionesSeleccionadas + 1)
                    }
                }} type="checkbox" disabled={opcionesSeleccionadas === 1 && optionCurso}></input>
                Comisiones
            </label>
            <label className='Checkbox'>
                <input defaultChecked={true} onChange={(e) => {
                    setOptionAlumno(!optionAlumno)
                    if (optionAlumno) {
                        setOpcionesSeleccionadas(opcionesSeleccionadas - 1)
                    } else {
                        setOpcionesSeleccionadas(opcionesSeleccionadas + 1)
                    }
                }} type="checkbox" disabled={opcionesSeleccionadas === 1 && optionAlumno}></input>
                Alumnos
            </label>
    </div>

    <div className='FiltroBox'>
        <div className='FiltrosList'>
            Filtros
            <label className='Filtro'>
            {"Año: "} 
            <select>
                {DeterminateNewYears().map((year,key)=> {
                    return <option onClick={(o) => {
                        setOptionYear(o.target.value)
                    }} key={key} value={year}>{year}</option>
                })}
            </select>
            </label>
        </div>
    </div>
</div>
}


export default CursadosFiltrosSection