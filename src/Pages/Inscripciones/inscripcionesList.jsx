import { useContext, useEffect, useState } from "react"
import { InsContext } from "../../Context/Context"


function InscripcionesList() {

    const { inscripciones, cursoSelected } = useContext(InsContext)

    const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState([])


    useEffect(() => {
        setInscripcionesFiltradas(inscripciones?.filter(
            i => i["Comision1"] === cursoSelected?.comision || i["Comision 2"] === cursoSelected?.comision
        ))
        console.log(inscripcionesFiltradas)

    }, [inscripciones, cursoSelected])


    return <>
    <div className="InscripcionesList">
        {inscripcionesFiltradas?.map((i, key)=> {
            
            return <Inscripcion key={key} inscripcion={i} ></Inscripcion>
       })}
    </div>
    </>
}


function Inscripcion({inscripcion}) {
    return <div>{inscripcion.legajo}</div>
}

export default InscripcionesList