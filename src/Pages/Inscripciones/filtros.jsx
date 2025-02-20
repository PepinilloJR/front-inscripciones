
import { useContext } from "react"
import { InsContext } from "../../Context/Context"
import SearchBar from "../../Components/searchbar"
import Cursos from "./cursos"
import Materias from "./materias"
import { DeterminateNewYears } from "../../Services/useful"

function InscripcionesFiltrosSection() {


    const {setMateriaFiltro, setOptionYear, setCursoFiltro} = useContext(InsContext)



    return <>
        <div className="Section">
            <div className="SectionContainer">
                Materias
                <SearchBar ContentSetter={setMateriaFiltro}></SearchBar>
                <Materias></Materias>
            </div>
        </div>
        <div className="Section">

            <div className="SectionContainer">
                Cursos
                <SearchBar ContentSetter={setCursoFiltro}></SearchBar>
                <label>
                    <select className="Filtro">
                        {DeterminateNewYears().map((year, key) => {
                            return <option onClick={(o) => {
                                setOptionYear(o.target.value)
                            }} key={key} value={year}>{year}</option>
                        })}
                    </select>
                </label>
                <Cursos></Cursos>
            </div>
        </div>
    </>
}


export default InscripcionesFiltrosSection