
import { useContext, useRef } from 'react';
import "../modales.css"
import { GeneralContext } from '../../Context/context';

import { POSTalumno } from "../../Services/http"

import { FormatText } from '../../Services/useful';

function CrearAlumnoModal() {

    const { setModal } = useContext(GeneralContext)

    const legajo = useRef('');
    const nombre = useRef('');
    const apellido = useRef('');

    return <>

        <div className="ModalTitulo">Crear nuevo Alumno</div>
        <div className="InputContainer">
            <div className="InputTitulo">Legajo </div>
            <input ref={legajo} type="text" className="Input">
            </input>
        </div>

        <div className="InputContainer">
            <div className="InputTitulo">Nombre </div>
            <input ref={nombre} type="text" className="Input">
            </input>
        </div>

        <div className="InputContainer">
            <div className="InputTitulo">Apellido </div>
            <input ref={apellido} type="text" className="Input">
            </input>
        </div>



        <div className="botonContainer">
            <button onClick={() => { setModal(undefined) }} className="botonCancelar">Cancelar</button>
            <button onClick={() => {
                setModal(undefined); 
                POSTalumno(
                    FormatText(legajo.current.value),
                    FormatText(nombre.current.value),
                    FormatText(apellido.current.value)
                )
            }} className="botonSubir">Subir</button>
        </div>
    </>
}

export default CrearAlumnoModal