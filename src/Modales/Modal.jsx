import { useContext } from "react"
import { GeneralContext } from "../Context/Context"




function Modal() {

    const { modal, setModal } = useContext(GeneralContext)

    return <div className="ModalContainer">
        <div className="Modal">
            {modal}
        </div>
    </div>
}


export default Modal
