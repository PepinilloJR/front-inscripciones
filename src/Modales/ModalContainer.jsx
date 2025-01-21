import { useContext } from "react"
import { GeneralContext } from "../Context/context"

function ModalContainer() {

    const { modal } = useContext(GeneralContext)

    return <div className="ModalContainer">
        <div className="Modal">
            {modal}
        </div>
    </div>
}


export default ModalContainer
