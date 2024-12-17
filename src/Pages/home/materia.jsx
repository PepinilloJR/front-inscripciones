import { useContext, useState } from "react"
import MateriaModal from "./materiaModal";
import { GeneralContext } from "../../Context/Context";

function Materia ({mat}) {

    const { setMateriaSelected } = useContext(GeneralContext)

    return <>
    <div onClick={() => {setMateriaSelected(mat)}} className="Materia">
        <div className="MateriaTitulo">
            {mat.Materia}
        </div> 
    </div>
    </>

}


export default Materia