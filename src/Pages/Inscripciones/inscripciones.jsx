import { useEffect, useRef, useState } from "react"
import { InsContext } from "../../Context/Context"
import "../Pages.css"
import { GETcursos, GETinscripciones, GETmaterias, POSTtardias } from "../../Services/http"
import InscripcionesList from "./inscripcionesList"
import DeterminarSelectividad from "./determinarSelectividad"

import InscripcionesFiltrosSection from "./filtros"
import InscripcionesSelectors from "./inscripcionesSelectors"
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
    const [inscripcionesEnviadas, setInscripcionesEnviadas] = useState()

    const [materiasFiltrados, setMateriasFiltrados] = useState([])
    const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState([])
    const [cursosFiltrados, setCursosFiltrados] = useState([])

    const [cursosMap, setCursosMap] = useState({})

    const [optionYear, setOptionYear] = useState(new Date().getFullYear().toString())

    const checkRef = useRef()

    // Los useEffect estan en orden de como se acciona cada uno, estan encadenados?)

    const fetchContent = async (setter, method, input) => {
        setter(await method(input))
    }


    useEffect(() => {

        fetchContent(setMaterias, GETmaterias)
    }, [])

    useEffect(() => {

        if (materiaSelected) {
            setCursoSelected()
        }

        fetchContent(setCursos, GETcursos, materiaSelected)
    }, [materiaSelected, inscripcionesEnviadas, optionYear])

    useEffect(() => {


        fetchContent(setInscripciones, GETinscripciones, materiaSelected)
    }, [materiaSelected, cursoSelected, inscripcionesEnviadas, optionYear])


    useEffect(() => {
        setMateriasFiltrados(materias?.filter(m => m.nombre.toLowerCase().includes(materiaFiltro.toLowerCase()) || materiaSelected === m))
    }, [materiaFiltro, materias])

    useEffect(() => {
        setCursosFiltrados(cursos?.filter(c => (c.comision.codigo.toLowerCase().includes(cursoFiltro.toLowerCase()) && c.año.toString() === optionYear) || cursoSelected === c))
    }, [cursoFiltro, cursos])

    useEffect(() => {
        var map = {}
        cursosFiltrados?.forEach(c => {
            map[c.comision.codigo] = c
        })
        setCursosMap(map)
    }, [cursosFiltrados])


    useEffect(() => {

        const filtrarInscripciones = async () => {
            setInscripcionesFiltradas(await inscripciones?.filter(
                i => (materiaSelected?.id === i.materia.id && i.año.toString() === optionYear && cursoSelected === undefined) ||
                    ((i.comision1.codigo === cursoSelected?.comision.codigo || i.comision2.codigo === cursoSelected?.comision.codigo) && i.materia.id === cursoSelected?.materia.id)
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
        setCursoFiltro,
        materias,
        setMateriaFiltro,
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
        setCursosFiltrados,
        optionYear,
        setOptionYear,
        checkRef,
        insPosibles,
        setInsPosibles

    }}>

        <div className="PageContainer">
            <InscripcionesFiltrosSection></InscripcionesFiltrosSection>
            <div className="PrincipalSection">
                <div className="SectionContainer">

                    <InscripcionesSelectors></InscripcionesSelectors>
                    <InscripcionesList></InscripcionesList>
                    
                    <div className='ButtonsContainer'>
                        <button onClick={async () => {
                            console.log(inscripcionesSelected);
                            setInscripcionesEnviadas(await POSTtardias(inscripcionesSelected))
                        }}
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