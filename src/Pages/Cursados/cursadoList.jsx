import { useContext, useEffect, useState } from "react"
import { CurContext } from "../../Context/Context"
import { Cursado } from "./cursado"

function CursadosList() {

    const { cursados, filtro, optionMateria, optionCurso, optionAlumno,cursadosFiltrados,setCursadosFIltrados,optionYear } = useContext(CurContext)


    useEffect(() => {

        const lista = cursados?.filter(i =>
           
            ((i.curso.materia.nombre.toLowerCase().includes(filtro.toLowerCase()) && optionMateria) ||
            (i.curso.comision.codigo.toLowerCase().includes(filtro.toLowerCase()) && optionCurso) ||
            (i.alumno.nombre.toLowerCase().includes(filtro.toLowerCase()) && optionAlumno) ||
            (i.alumno.apellido.toLowerCase().includes(filtro.toLowerCase()) && optionAlumno) ||
            (i.alumno.legajo.toString().toLowerCase().includes(filtro.toLowerCase()) && optionAlumno))
            && 
            (i.año === optionYear) 
        )
        setCursadosFIltrados(lista)


    }, [cursados, filtro, optionYear])

    return <div className="CursadosListBox">
        <div className='CursadosList'>
            {cursadosFiltrados?.map((c, key) => {

                return <Cursado cursado={c} key={key}></Cursado>
            })}
        </div>
    </div>
}

export default CursadosList