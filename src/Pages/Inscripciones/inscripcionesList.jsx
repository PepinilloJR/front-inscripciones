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
    const { materiasFiltrados, setInscripcionesSelected, inscripcionesSelected } = useContext(InsContext)

    const isInscripcionSelected = inscripcionesSelected.find(a => a === inscripcion)

    return <div onClick={()=> {
        setInscripcionesSelected([...inscripcionesSelected, inscripcion])

    }} className={isInscripcionSelected ? "InscripcionSelected" : "Inscripcion"}>
    
    <div>{inscripcion.alumno}</div>
    <div>{inscripcion.materia}</div>
    <div>{inscripcion.comision1}</div>
    <div>{inscripcion.comision2}</div>
    <div>{materiasFiltrados[inscripcion.materia - 1]?.nombre}</div>
    </div>
}

export default InscripcionesList