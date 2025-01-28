import { useContext, useEffect, useState } from "react"
import { InsContext } from "../../Context/Context"


function Cursos() {

    const { cursos, cursoFiltro } = useContext(InsContext)

    const [cursosFiltrados, setCursosFiltrados] = useState([])

    useEffect(() => {
        setCursosFiltrados(cursos?.filter(a => a.comision.toLowerCase().includes(cursoFiltro.toLowerCase()) ))
    }, [cursoFiltro, cursos])


    return <>
    <div className="CursosList">
        {cursosFiltrados?.map((c, key)=> {
            
            return <Curso key={key} curso={c} ></Curso>
       })}
    </div>
    </>
}


function Curso({curso}) {

    const { setCursoSelected, cursoSelected } = useContext(InsContext)


    return <div onClick={()=> {
        setCursoSelected(curso)
        console.log(cursoSelected)
    }}>{curso.comision}</div>
}


export default Cursos