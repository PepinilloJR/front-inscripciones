
import { useContext, useRef } from 'react';
import './crearAlumno.css'
import "../modales.css"
import { GeneralContext } from '../../Context/Context';

import { POSTalumno } from '../POST';

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
                setModal(undefined); POSTalumno(
                    legajo.current.value,
                    nombre.current.value,
                    apellido.current.value
                )
            }} className="botonSubir">Subir</button>
        </div>
    </>
}

export default CrearAlumnoModal