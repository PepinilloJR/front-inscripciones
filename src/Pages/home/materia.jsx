import MateriaModal from "../../Modales/MateriaModal/materiaModal";
import { useContext } from "react";
import { GeneralContext } from "../../Context/context";

function Materia({ mat }) {

    const { setMateriaSelected, setModal } = useContext(GeneralContext)

    return <>
        <div onClick={() => { setMateriaSelected(mat); setModal(<MateriaModal></MateriaModal>) }} className="Materia">
            <div className="MateriaTitulo">
                {mat.nombre}
            </div>
        </div>
    </>

}

export default Materia