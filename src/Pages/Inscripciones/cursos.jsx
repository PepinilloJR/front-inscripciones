import { useContext, useEffect, useState } from "react"
import { InsContext } from "../../Context/Context"
import "./inscripciones.css"
import { FormatHour } from "../../Services/useful"
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
    return <div className={cursoSelected?.id === curso?.id ? "ItemSelected" : "Item"} onClick={()=> {
        if (cursoSelected?.id === curso?.id) {
            setCursoSelected(undefined)
        } else {
            setCursoSelected(curso)

        }
    }}>
        <div className="Campo">{curso.comision.codigo}</div>
        <div className="Campo">{curso.materia.nombre}</div>
        <div className="Campo">cupos disponibles: {curso.cupo - curso.inscriptos}</div>
        <div className="Campo">horarios: {FormatHour(curso.hora_inicio)} - {FormatHour(curso.hora_fin)}</div>
    </div>
}


export default Cursos