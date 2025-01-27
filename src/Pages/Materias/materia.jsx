import MateriaModal from "../../Modales/materiaModal/materiaModal"
import { useContext } from "react";
import { GeneralContext } from "../../Context/Context"
import { Link } from "react-router-dom";
function Materia({ mat }) {

    const { setMateriaSelected, setModal } = useContext(GeneralContext)

    return <>
    <Link to="/inscripciones">
        <div onClick={() => { setMateriaSelected(mat); /*setModal(<MateriaModal></MateriaModal>)*/ }} className="Materia">
            <div className="MateriaTitulo">
                {mat.nombre}
            </div>
        </div>
    </Link>
    </>

}

export default Materia