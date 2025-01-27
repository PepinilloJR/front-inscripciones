import { useContext, useEffect, useState } from "react"
import { GeneralContext, InsContext } from "../../Context/Context"
import SearchBar from "../../Components/searchbar"
import "./inscripciones.css"
import { GETcursos, GETinscripciones, GETmaterias } from "../../Services/http"
import Cursos from "./cursos"
import Materias from "./materias"

function Inscripciones() {

    const [materias, setMaterias] = useState()

    const [cursos, setCursos] = useState()

    const [inscripciones, setInscripciones] = useState()

    const [materiaFiltro, setMateriaFiltro] = useState("")
    const [cursoFiltro, setCursoFiltro] = useState("")

    const [cursoSelected, setCursoSelected] = useState()

    const [materiaSelected, setMateriaSelected] = useState()


    useEffect(()=> {
        const ObtainMaterias = async () => {
            setMaterias(await GETmaterias())
        }
        const ObtainCursos = async () => {
            setCursos(await GETcursos())
        }
        const ObtainInscripciones = async () => {
            setInscripciones(await GETinscripciones())
        }
        
        ObtainMaterias()
        ObtainCursos()
    }, [])


    return <InsContext.Provider value={{
        cursos,
        cursoFiltro,
        materias,
        materiaFiltro,
    }}>

    <div className="InscripcionesContainer"> 
        <div className="MateriasSection">
            <div className="MateriasBox">
                Materias
                <SearchBar ContentSetter={setMateriaFiltro}></SearchBar>
                <Materias></Materias>
            </div>
        </div>
        <div className="CursosSection">
            <div className="CursosBox">
                Cursos
                <SearchBar ContentSetter={setCursoFiltro}></SearchBar>
                <Cursos></Cursos>
            </div>
        </div>
        <div className="InscripcionesSection">
            <div className="InscripcionesBox">

            </div>
        </div>
    </div>
    </InsContext.Provider>

}



export default Inscripciones