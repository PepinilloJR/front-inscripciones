import { useContext } from "react"
import { InsContext } from "../../Context/Context"


function Materias() {

    const { materiasFiltrados  } = useContext(InsContext)



    return <>
    <div className="SingleList">

        {materiasFiltrados?.map((m, key)=> {
            return <Materia key={key} materia={m} ></Materia>
       })}
    </div>
    </>
}


function Materia({materia}) {

    const { setMateriaSelected, materiaSelected } = useContext(InsContext)


    return <div className={materiaSelected === materia ? "ItemSelectedSticky" : "Item"} onClick={()=> {
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