import { useContext, useEffect, useState } from "react"
import { GeneralContext } from "../../Context/context"

import "./materiaModal.css"
import "../modales.css"
import Alumno from "./alumno"

function MateriaModal() {

    const { materiaSelected } = useContext(GeneralContext)

    const [comisiones, setComisiones] = useState([])
    const [alumnos, setAlumnos] = useState([])


    const [comisionSelected, setComisionSelected] = useState("")

    useEffect(() => {
        GETalumnos(materiaSelected.id, setComisiones, setAlumnos)
    }, [])

    return <>
        <div className="ModalTitulo">
            {materiaSelected.nombre}
        </div>

        <div className="MateriaModalContent">
            <div className="Comisiones">
                <div className="ModalTitulo">
                    Comisiones disponibles
                </div>
                <div className="ComisionesList">
                    {comisiones?.map((c, key) => {
                        return <div onClick={() => { setComisionSelected(c) }} className="Comision" key={key}>{c}</div>
                    })}
                </div>
            </div>

            <div className="AlumnosContainer">
                <div className="ModalTitulo">
                    Alumnos solicitando inscripcion
                </div>
                <div className="AlumnosList">
                    {alumnos?.map((a, key) => {
                        if (a["Comision 1"] === comisionSelected || a["Comision 2"] === comisionSelected) {
                            return <Alumno key={key} alumno={a}></Alumno>
                        }

                    })}
                </div>
            </div>
        </div>
    </>
}


async function GETalumnos(idmateria, setComisiones, setAlumnos) {
    console.log(idmateria)
    try {
        const response = await fetch(`http://127.0.0.1:8000/inscripciones/materia/${idmateria}`, {
            headers: {
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        setAlumnos(json.alumnos)
        setComisiones(DefineComisiones(json.alumnos))
    } catch (error) {
        console.log(error)
    }

}

function DefineComisiones(alumnos) {
    const Comisiones = []
    alumnos?.forEach(a => {
        if (Comisiones.find(c => a["Comision 1"] === c) === undefined) {
            Comisiones.push(a["Comision 1"])
        }

        if (Comisiones.find(c => a["Comision 2"] === c) === undefined) {
            Comisiones.push(a["Comision 2"])
        }
    });
    return Comisiones

}


export default MateriaModal