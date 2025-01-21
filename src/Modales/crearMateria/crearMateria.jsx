import { useContext, useRef, useState } from "react"
import { GeneralContext } from "../../Context/Context";

import "../modales.css"
import { POSTmateria } from "../../Services/http"

import { FormatText } from '../../Services/useful';

function CrearMateriaModal() {

    const {setModal} = useContext(GeneralContext)

    const NombreRef = useRef("")
    const [mensajeResultado, setMensajeResultado] = useState()

    return  <>
            <div className="ModalTitulo">Crear nueva materia</div>
            <div className="InputContainer">
                <div className="InputTitulo">Nombre </div>
                <input ref={NombreRef} type="text" className="Input"> 
                </input>
            </div>

            <div className='MessageContainer'>
                <div className={mensajeResultado?.status === "ok" ? 'MessageSuccess' : 'MessageError'}>{mensajeResultado?.message}</div>
            </div>

            <div className="botonContainer"> 
                <button onClick={() => {setModal(undefined)}} className="botonCancelar">Cancelar</button>
                <button onClick={async () => {
                    //setModal(undefined)
                    const mensaje = await POSTmateria(FormatText(NombreRef.current.value))
                    setMensajeResultado(mensaje)

                }} className="botonSubir">Subir</button>
            </div>
            </>

}


export default CrearMateriaModal