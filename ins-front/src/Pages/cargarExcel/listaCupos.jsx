import { useContext, useEffect, useState } from "react"
import { ListadoContext } from "../../Context/Context"

import Curso from "./curso"


function ListadoCupos() {

    const {listaCupos, listaIns} = useContext(ListadoContext)

    const [Cursos, setCursos] = useState([])


    // funcion temporal hasta tener esto en el back, filtro los cursos para luego listar a partir de cada uno las materias, cupos, etc.
    // es decir, estoy armando un formato para listar todo
    // la idea seria
    // tabla de cursos = [... curso -> { materias: [{nombre: asda, cupos: 23, ...} ...]  }
    
    // como digo, eso deberia venir desde el back ya armadito, si no tendria que hacer esto todo el rato
    const filtrarCursos = () => {

        const tabla = new Map();
        
        for (const o of listaCupos) {
        
            var listaMaterias = tabla.get(o.curso)
            if (listaMaterias) {
                listaMaterias = listaMaterias.push({materia: o.materia, cupo: o.cupo, inscriptos: o.inscriptos})
                //console.log(tabla)
            } else {
                tabla.set(o.curso, [{materia: o.materia, cupo: o.cupo, inscriptos: o.inscriptos}])
            }
        }
        

        setCursos(tabla)

    }

    useEffect(()=> {
        //console.log(Cursos)
    }, [Cursos])

    useEffect(()=> {
        if (listaCupos) {
            filtrarCursos()
        }

    }, [listaCupos])


    useEffect(() => {
        console.log(listaCupos)
        console.log(listaIns)
    }, [listaIns, listaCupos])


    return <>
        <div className="CursosContainer">
            {Array.from(Cursos).map((value, key) => {
                return (<Curso key={key} value={value} ></Curso>)
            })}
        </div>
    </>
}


export default ListadoCupos