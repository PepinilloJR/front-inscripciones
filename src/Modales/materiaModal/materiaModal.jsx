import { useContext, useEffect, useState } from "react"
import { GeneralContext, InsContext } from "../../Context/Context"

import "../modales.css"
import Alumno from "./alumno"

import { GETcursosByMateria, GETinscripcionesByMateria, POSTcursados } from "../../Services/http"
import Curso from "./curso"

function MateriaModal() {

    const { materiaSelected, setModal, modal } = useContext(GeneralContext)

    const [cursos, setCursos] = useState()
    const [inscripciones, setInscripciones] = useState()

    const [alumnos, setAlumnos] = useState()

    const [cursoSelected, setCursoSelected] = useState()
    const [alumnosSelected, setAlumnosSelected] = useState([])

    const [mensajeResultado, setMensajeResultado] = useState()

    useEffect(() => {
        const ObtenerCursos = async () => {
            setCursos(await GETcursosByMateria(materiaSelected.id))
            console.log(cursos)
        }

        const ObtenerInscripciones = async () => {
            setInscripciones(await GETinscripcionesByMateria(materiaSelected.id))
            console.log(inscripciones)
        }

        ObtenerCursos()
        ObtenerInscripciones()
    }, [])


    useEffect(() => {
        const ObtenerAlumnos = async () => {
            setAlumnos(await DefineAlumnos(cursoSelected, inscripciones))
        }
        ObtenerAlumnos()
        
    }, [cursoSelected])


    return <>
    <InsContext.Provider value={{
        cursoSelected, setCursoSelected, alumnosSelected, setAlumnosSelected
    }}>
        <div className="ModalTitulo">
            {materiaSelected.nombre}
        </div>

        <div className="SectionsContainer">
            <div className="Section">
                <div className="ModalTitulo">
                    Cursos disponibles
                </div>
                <div className="list">
                    {cursos?.map((c, key) => {
                        return <Curso key={key} curso={c}></Curso>
                    })}
                </div>
            </div>

            <div className="Section">
                <div className="ModalTitulo">
                    Alumnos solicitando inscripcion
                </div>
                <div className="list">
                    {alumnos?.map((a, key) => {
                        return <Alumno key={key} alumno={a}></Alumno>
                    })}
                </div>
            </div>
            
        </div>

        <div className='MessageContainer'>
            <div className={mensajeResultado?.status === "ok" ? 'MessageSuccess' : 'MessageError'}>{mensajeResultado?.message}</div>
        </div>

        <div className="botonContainer">
                    <button onClick={() => {setAlumnosSelected([]); setModal(undefined);  }} className="botonCancelar">Cancelar</button>
                    <button onClick={async () => {
                        const mensaje = await POSTcursados(cursoSelected, alumnosSelected, materiaSelected); 
                        setMensajeResultado(mensaje)
                        setAlumnosSelected([]); 
                        //setModal(undefined) 
                    }} className="botonSubir">Subir</button>
        </div>
    </InsContext.Provider>
    </>
    
}


async function DefineAlumnos(cursoSelected, inscripciones) {
    console.log(cursoSelected)
    console.log(inscripciones)
    const alumnos = []

    inscripciones?.forEach(i => {
        if (i["Comision 1"] === cursoSelected.comision || i["Comision 2"] === cursoSelected.comision) {
            alumnos.push(i)
        }
    });
    console.log(alumnos)
    return alumnos
}



export default MateriaModal