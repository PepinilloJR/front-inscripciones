import { useContext, useEffect, useState } from "react"
import { InsContext } from "../../Context/Context"


function Cursos() {

    const { cursos, cursoFiltro } = useContext(InsContext)

    const [cursosFiltrados, setCursosFiltrados] = useState([])

    useEffect(() => {
        setCursosFiltrados(cursos.filter(a => a.comision.toLowerCase().includes(cursoFiltro.toLowerCase()) ))
    }, [cursoFiltro])


    return <>
    <div className="CursosList">
        {cursosFiltrados?.map((c, key)=> {
            
            return <Curso key={key} curso={c} ></Curso>
       })}
    </div>
    </>
}


function Curso({curso}) {
    return <div>{curso.comision}</div>
}


export default Cursos