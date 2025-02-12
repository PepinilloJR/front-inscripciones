import { useContext, useEffect, useState } from "react"
import { GeneralContext, InsContext } from "../../Context/Context"
import SearchBar from "../../Components/searchbar"
import "./inscripciones.css"
import { GETcursos, GETinscripciones, GETmaterias, POSTtardias } from "../../Services/http"
import Cursos from "./cursos"
import Materias from "./materias"
import InscripcionesList from "./inscripcionesList"
import DeterminarSelectividad from "./determinarSelectividad"

function Inscripciones() {

    const [materias, setMaterias] = useState()

    const [cursos, setCursos] = useState()

    const [inscripciones, setInscripciones] = useState()

    const [materiaFiltro, setMateriaFiltro] = useState("")
    const [cursoFiltro, setCursoFiltro] = useState("")

    const [cursoSelected, setCursoSelected] = useState()

    const [materiaSelected, setMateriaSelected] = useState()


    const [insPosibles, setInsPosibles] = useState([])
    const [inscripcionesSelected, setInscripcionesSelected] = useState([])

    const [ materiasFiltrados, setMateriasFiltrados ] = useState([])
    const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState([])
    const [cursosFiltrados, setCursosFiltrados] = useState([])

    const [cursosMap, setCursosMap] = useState({})

    // Los useEffect estan en orden de como se acciona cada uno, estan encadenados

    useEffect(()=> {
        const ObtainMaterias = async () => {
            setMaterias(await GETmaterias())
        }

        ObtainMaterias()
    }, [])

    useEffect(()=> {
        const ObtainCursos = async () => {
            setCursos(await GETcursos(materiaSelected))
        }

        if (materiaSelected) {
            setCursoSelected()
        }

        ObtainCursos()
    }, [materiaSelected])

    useEffect(() => {
        const ObtainInscripciones = async () => {
            setInscripciones(await GETinscripciones(materiaSelected))
        }

        ObtainInscripciones()
    }, [materiaSelected])


    useEffect(() => {
        setMateriasFiltrados(materias?.filter(m => m.nombre.toLowerCase().includes(materiaFiltro.toLowerCase()) || materiaSelected === m ))
    }, [materiaFiltro, materias])

    useEffect(() => {
        setCursosFiltrados(cursos?.filter(c => c.comision.codigo.toLowerCase().includes(cursoFiltro.toLowerCase()) || cursoSelected === c  ))
    }, [cursoFiltro, cursos])

    useEffect(()=> {
        var map = {}
        cursosFiltrados?.forEach(c => {
            map[c.comision.codigo] = c
        })
        setCursosMap(map)
    }, [cursosFiltrados])


    useEffect(() => {

        const filtrarInscripciones = async () => {
            setInscripcionesFiltradas(await inscripciones?.filter(
                i => (materiaSelected?.id === i.materia.id && cursoSelected === undefined) || 
                ((i.comision1.codigo === cursoSelected?.comision.codigo ||  i.comision2.codigo === cursoSelected?.comision.codigo) && i.materia.id === cursoSelected?.materia.id)
                
            ))
        }
        filtrarInscripciones()
        console.log(inscripcionesFiltradas)
    }, [cursoSelected, inscripciones])


    useEffect(() => {
        setInsPosibles(DeterminarSelectividad(inscripcionesFiltradas, cursosMap, materiaSelected, cursoSelected))
    }, [inscripcionesFiltradas])


    

    return <InsContext.Provider value={{
        cursos,
        cursoFiltro,
        materias,
        materiaFiltro,
        inscripciones,
        materiaSelected,
        setMateriaSelected,
        cursoSelected,
        setCursoSelected,
        inscripcionesSelected, 
        setInscripcionesSelected,
        materiasFiltrados,
        setMateriasFiltrados,
        inscripcionesFiltradas,
        setInscripcionesFiltradas,
        cursosFiltrados,
        setCursosFiltrados

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
                <label>
                    Seleccionar {insPosibles?.length} posibles inscripciones
                <input type="checkbox" onChange={() => {
                    setInscripcionesSelected(insPosibles)
                }}></input>
                </label>
                <InscripcionesList></InscripcionesList>
                <div className='ButtonsContainer'>
                <button onClick={()=> {POSTtardias(inscripcionesSelected)}} className='ExportarButton'>
                    Inscribir seleccionados
                </button>
            </div>
            </div>
        </div>

    </div>
    </InsContext.Provider>

}



export default Inscripciones