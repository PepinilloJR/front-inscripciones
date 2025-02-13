import { useContext, useEffect, useState } from "react"
import { InsContext } from "../../Context/Context"

// esta parte tiene algunos ifs por los modelos del back, esto luego se va a cambiar

function InscripcionesList() {

    const {  inscripcionesFiltradas } = useContext(InsContext)

    return <>
    <div className="InscripcionesListContainer">
    <div className="InscripcionesList">
        {inscripcionesFiltradas?.map((i, key)=> {
            
            return <Inscripcion key={key} inscripcion={i} ></Inscripcion>
       })}
       
    </div>
    </div>
    </>
}


function Inscripcion({inscripcion}) {
    console.log(inscripcion)
    const { materiasFiltrados, setInscripcionesSelected, inscripcionesSelected, cursoSelected, cursosFiltrados } = useContext(InsContext)

    const isInscripcionSelected = inscripcionesSelected.find(i => i.inscripcion === inscripcion)

    const [claseInscripcion, setClaseInscripcion] = useState("Inscripcion")


    useEffect(()=> {
        //console.log(inscripcionesSelected)
        const ins = inscripcionesSelected.find(i => i.inscripcion === inscripcion)
        if (ins && ins?.curso.comision.codigo === ins?.inscripcion.comision1.codigo) {
            setClaseInscripcion("InscripcionSelected")
        } else if (ins && ins?.curso.comision.codigo === ins?.inscripcion.comision2.codigo) {
            setClaseInscripcion("InscripcionSelectedSecond")
        } else {
            setClaseInscripcion("Inscripcion")
        }
    },[inscripcionesSelected])


    return <div onClick={()=> {
        //console.log(inscripcionesSelected)
        if (isInscripcionSelected) {
            const ins = inscripcionesSelected?.filter(i => i.inscripcion !== inscripcion)
            setInscripcionesSelected(ins)
        } else {

            // se hace lo siguiente
            // si no hay un curso seleccionado, se intenta asignarlo al curso principal
            // si no hay espacio en el principal, se asigna en el secundario
            // si no hay espacio en el secundario, no se asigna, y se realiza la comprobacion para el rojo (vere como)

            if (cursoSelected && cursoSelected?.cupo - (cursoSelected?.inscriptos + inscripcionesSelected?.length) > 0) {
                
                const ins = {
                    inscripcion: inscripcion,
                    curso: cursoSelected
                } 
                setInscripcionesSelected([...inscripcionesSelected, ins])

                
            } else if (!cursoSelected) {
                
                // para asignarle el primario o el secundario, de todas formas primero se debe saber
                // si para cada uno, existe el curso que busca

                // esto tiene un problema es que suma inscripcionesSelected pero se terminan sumando otras
                // que no son parte de ninguna de las 2 comisiones, dando un falso flag de no espacio

                // solucion vaga --> obtener antes de asignarla cuales de las inscripciones selected son
                //                   de su misma comision, luego comparar sumando ESAS inscripciones al cupo
                //                   de esa forma logramos no pasarnos del cupo
                var cursoAsignado = cursosFiltrados?.find(c => c.comision.codigo === inscripcion.comision1.codigo)

                var asignados = inscripcionesSelected?.filter(i => i.inscripcion.comision1.codigo === inscripcion.comision1.codigo
                    || i.inscripcion.comision2.codigo === inscripcion.comision1.codigo)?.length
                console.log(asignados)
                if (cursoAsignado && cursoAsignado?.cupo - (cursoAsignado?.inscriptos + asignados) > 0) {
                    const ins = {
                        inscripcion: inscripcion,
                        curso: cursoAsignado
                    } 
                    setInscripcionesSelected([...inscripcionesSelected, ins])

                } else {
                    cursoAsignado = cursosFiltrados?.find(c => c.comision.codigo === inscripcion.comision2.codigo)
                    asignados = inscripcionesSelected?.filter(i => i.inscripcion.comision1.codigo === inscripcion.comision2.codigo
                        || i.inscripcion.comision2.codigo === inscripcion.comision2.codigo)?.length
                    console.log(asignados)
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
    }} className={claseInscripcion}>
    
    <div className="InscripcionCampo">{inscripcion.alumno.nombre} {inscripcion.alumno.apellido}</div>
    <div className="InscripcionCampo">Legajo:{inscripcion.alumno.legajo}</div>
    <div className="InscripcionCampo">Comision 1:{inscripcion.comision1.codigo}</div>
    <div className="InscripcionCampo">Comision 2:{inscripcion.comision2.codigo}</div>
    <div className="InscripcionCampo">{inscripcion.materia.nombre}</div>
    </div>
}

export default InscripcionesList