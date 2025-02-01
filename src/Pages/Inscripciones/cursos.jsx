import { useContext, useEffect, useState } from "react"
import { InsContext } from "../../Context/Context"
import "./inscripciones.css"

function Cursos() {

    const { cursos, cursoFiltro, cursoSelected, cursosFiltrados, setCursosFiltrados } = useContext(InsContext)


    return <>
    <div className="CursosList">
        {cursosFiltrados?.map((c, key)=> {
            return <Curso key={key} curso={c} ></Curso>
       })}
    </div>
    </>
}


function Curso({curso}) {

    const { setCursoSelected, cursoSelected, materias } = useContext(InsContext)

    
    return <div className={cursoSelected?.id === curso?.id ? "CursoSelected" : "Curso"} onClick={()=> {
        if (cursoSelected?.id === curso?.id) {
            setCursoSelected(undefined)
        } else {
            setCursoSelected(curso)

        }
    }}>
        <div>{curso.comision.codigo}</div>
        {materias ? <div>{materias[curso?.materia - 1]?.nombre}</div> : <></>}
    </div>
}


export default Cursos