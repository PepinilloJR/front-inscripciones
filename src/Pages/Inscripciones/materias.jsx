import { useContext } from "react"
import { InsContext } from "../../Context/Context"
import { useState, useEffect } from "react"

function Materias() {

    const { materias, materiaFiltro } = useContext(InsContext)


    const [ materiasFiltrados, setMateriasFiltrados ] = useState([])
    
    useEffect(() => {
        setMateriasFiltrados(materias?.filter(m => m.nombre.toLowerCase().includes(materiaFiltro.toLowerCase()) ))
    }, [materiaFiltro, materias])

    return <>
    <div className="MateriasList">
        {materiasFiltrados?.map((c, key)=> {
        
            return <Materia key={key} materia={c} ></Materia>
       
       })}
    </div>
    </>
}


function Materia({materia}) {

    const { setMateriaSelected, materiaSelected } = useContext(InsContext)

    return <div onClick={()=> {
        setMateriaSelected(materia)
        console.log(materiaSelected)
    }}>{materia.nombre}</div>
}


export default Materias