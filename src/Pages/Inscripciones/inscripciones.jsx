import { useContext, useEffect, useRef, useState } from "react"
import { GeneralContext, InsContext } from "../../Context/Context"
import SearchBar from "../../Components/searchbar"
import "./inscripciones.css"
import "../Pages.css"
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
    //const [cursoSelectedCupo, setCursoSelectedCupo] = useState(0)

    const [materiaSelected, setMateriaSelected] = useState()


    const [insPosibles, setInsPosibles] = useState([])
    const [inscripcionesSelected, setInscripcionesSelected] = useState([])
    const [inscripcionesEnviadas, setInscripcionesEnviadas] = useState()

    const [ materiasFiltrados, setMateriasFiltrados ] = useState([])
    const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState([])
    const [cursosFiltrados, setCursosFiltrados] = useState([])

    const [cursosMap, setCursosMap] = useState({})

    const checkRef = useRef()

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
    }, [materiaSelected, inscripcionesEnviadas])

    useEffect(() => {

        const ObtainInscripciones = async () => {
            setInscripciones(await GETinscripciones(materiaSelected))
        }
        //setCursoSelectedCupo(cursoSelected?.cupo - cursoSelected?.inscriptos)
        ObtainInscripciones()
    }, [materiaSelected, cursoSelected, inscripcionesEnviadas])


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
        setInscripcionesSelected([])
        checkRef.current.checked = false;
    }, [cursoSelected, inscripciones, materiaSelected])


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

    <div className="PageContainer"> 
        <div className="Section">
            <div className="SectionBox">
                Materias
                <SearchBar ContentSetter={setMateriaFiltro}></SearchBar>
                <Materias></Materias>
            </div>
        </div>
        <div className="Section">
            <div className="SectionBox">
                Cursos
                <SearchBar ContentSetter={setCursoFiltro}></SearchBar>
                <Cursos></Cursos>
            </div>
        </div>
        <div className="PrincipalSection">
            <div className="SectionBox">

                <div className="Selectors">

                
                <label className="Checkbox">
                <input ref={checkRef} type="checkbox" onChange={(e) => {
                    console.log(e.target.checked)
                    if(!e.target.checked) {
                        setInscripcionesSelected([])
                    }
                    else {
                        setInscripcionesSelected(insPosibles)
                    }

                }} ></input>
                Seleccionar {insPosibles?.length} posibles inscripciones
                </label>

                <div className="SelectedCount">Seleccionados: {inscripcionesSelected?.length}/{inscripcionesFiltradas?.length}</div>

                </div>
                <InscripcionesList></InscripcionesList>
                <div className='ButtonsContainer'>
                <button onClick={async ()=> {
                console.log(inscripcionesSelected);
                setInscripcionesEnviadas(await POSTtardias(inscripcionesSelected))}} 
                className={inscripcionesSelected?.length > 0 ? 'SendButton' : 'DisabledButton'}
                disabled={inscripcionesSelected?.length === 0}>

                    Inscribir seleccionados
                </button>
            </div>
            </div>
        </div>

    </div>
    </InsContext.Provider>

}



export default Inscripciones