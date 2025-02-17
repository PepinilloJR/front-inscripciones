import { useContext } from "react"
import { InsContext } from "../../Context/Context"
import { useState, useEffect } from "react"

import "./inscripciones.css"

function Materias() {

    const { materias, materiaFiltro, materiaSelected, materiasFiltrados, setMateriasFiltrados  } = useContext(InsContext)



    return <>
    <div className="MateriasList">

        {materiasFiltrados?.map((m, key)=> {
            return <Materia key={key} materia={m} ></Materia>
       })}
    </div>
    </>
}


function Materia({materia}) {

    const { setMateriaSelected, materiaSelected, setCursoSelected, cursoSelected } = useContext(InsContext)


    return <div className={materiaSelected === materia ? "ItemSelected" : "Item"} onClick={()=> {
        if (materiaSelected === materia) {
            setMateriaSelected(undefined)

        } else {
            setMateriaSelected(materia)
        }
    }}>
        <div className="Campo" >
        {materia.nombre}
        </div>

        
    </div>
}


export default Materias