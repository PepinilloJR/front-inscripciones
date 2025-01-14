import { useContext, useRef } from "react"
import { GeneralContext } from "../../Context/context"
import "../modales.css"
import { POSTmateria } from "../../Services/http"

import { FormatText } from "../../Components/useful"

function CrearMateriaModal() {

    const {setModal} = useContext(GeneralContext)

    const NombreRef = useRef("")


    return <div className="ModalContainer">
            <div className="Modal">
    
            <div className="ModalTitulo">Crear nueva materia</div>
            <div className="InputContainer">
                <div className="InputTitulo">Nombre </div>
                <input ref={NombreRef} type="text" className="Input"> 
                </input>
            </div>
            <div className="botonContainer"> 
                <button onClick={() => {setModal(undefined)}} className="botonCancelar">Cancelar</button>
                <button onClick={() => {
                    setModal(undefined)
                    POSTmateria(FormatText(NombreRef.current.value))
                }} className="botonSubir">Subir</button>
            </div>
            </div>
        </div>
}


export default CrearMateriaModal