import { useContext, useState } from "react"
import { GeneralContext, InsContext } from "../../Context/Context"


function Alumno({alumno}) {

    const { alumnosSelected, setAlumnosSelected } = useContext(InsContext)

    return <div className={alumnosSelected.find(a => a === alumno) ? "listElementSelected" : "listElement"} onClick={
        ()=> {
            if (alumnosSelected.find(a => a === alumno)) {
                setAlumnosSelected(alumnosSelected.filter(a => a !== alumno))
            } else {
                setAlumnosSelected([...alumnosSelected, alumno])
            }
            console.log(alumnosSelected)
        }
        }>
        <div className="listData"> Legajo: {alumno.legajo} </div>
        <div className="listData">Nombre: {alumno.nombre}</div>
        <div className="listData">Apellido: {alumno.apellido}</div>
        <div className="listData">Comision opcion 1: {alumno["Comision 1"]}</div>
        <div className="listData">Comision opcion 2: {alumno["Comision 2"]}</div>
    </div>
}


export default Alumno