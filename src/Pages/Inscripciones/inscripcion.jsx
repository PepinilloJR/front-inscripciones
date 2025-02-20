import { useContext, useEffect, useState } from "react"
import { InsContext } from "../../Context/Context"

function Inscripcion({inscripcion}) {
    const { setInscripcionesSelected, inscripcionesSelected, cursoSelected, cursosFiltrados } = useContext(InsContext)

    const isInscripcionSelected = inscripcionesSelected?.find(i => i.inscripcion === inscripcion)

    const [claseInscripcion, setClaseInscripcion] = useState("Item")


    useEffect(()=> {
        // se define aqui el color que tendra la inscripcion considerando si, esta seleccionado
        // y si esta siendo asignado a la opcion 1 u opcion 2
        const ins = inscripcionesSelected?.find(i => i.inscripcion === inscripcion)
        if (ins && ins?.curso.comision.codigo === ins?.inscripcion.comision1.codigo) {
            setClaseInscripcion("ItemSelected")
        } else if (ins && ins?.curso.comision.codigo === ins?.inscripcion.comision2.codigo) {
            setClaseInscripcion("ItemSelectedSecond")
        } else {
            setClaseInscripcion("Item")
        }
    },[inscripcionesSelected])


    const manejarSeleccion = () => {
        if (isInscripcionSelected) {
            const ins = inscripcionesSelected?.filter(i => i.inscripcion !== inscripcion)
            setInscripcionesSelected(ins)
        } else {
               if (cursoSelected && cursoSelected?.cupo - (cursoSelected?.inscriptos + inscripcionesSelected?.length) > 0) {
                
                const ins = {
                    inscripcion: inscripcion,
                    curso: cursoSelected
                } 
                setInscripcionesSelected([...inscripcionesSelected, ins])

                
            } else if (!cursoSelected) {
                
                var cursoAsignado = cursosFiltrados?.find(c => c.comision.codigo === inscripcion.comision1.codigo)

                var asignados = inscripcionesSelected?.filter(i => i.inscripcion.comision1.codigo === inscripcion.comision1.codigo || i.inscripcion.comision2.codigo === inscripcion.comision1.codigo)?.length

                if (cursoAsignado && cursoAsignado?.cupo - (cursoAsignado?.inscriptos + asignados) > 0) {
                    const ins = {
                        inscripcion: inscripcion,
                        curso: cursoAsignado
                    } 
                    setInscripcionesSelected([...inscripcionesSelected, ins])

                } else {
                    cursoAsignado = cursosFiltrados?.find(c => c.comision.codigo === inscripcion.comision2.codigo)
                    asignados = inscripcionesSelected?.filter(i => i.inscripcion.comision1.codigo === inscripcion.comision2.codigo || i.inscripcion.comision2.codigo === inscripcion.comision2.codigo)?.length

                    if (cursoAsignado && cursoAsignado?.cupo - (cursoAsignado?.inscriptos + asignados) > 0) {
                        const ins = {
                            inscripcion: inscripcion,
                            curso: cursoAsignado
                        } 
                        setInscripcionesSelected([...inscripcionesSelected, ins])
                    }
                }
            }
        }
    }


    return <div onClick={manejarSeleccion} className={claseInscripcion}>
    
    <div className="Campo">{inscripcion.alumno.nombre} {inscripcion.alumno.apellido}</div>
    <div className="Campo">Legajo:{inscripcion.alumno.legajo}</div>
    <div className="Campo">Comision 1:{inscripcion.comision1.codigo}</div>
    <div className="Campo">Comision 2:{inscripcion.comision2.codigo}</div>
    <div className="Campo">{inscripcion.materia.nombre}</div>
    </div>
}

export default Inscripcion