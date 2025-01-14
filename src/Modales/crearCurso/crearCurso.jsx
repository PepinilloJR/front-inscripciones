
import { useContext, useRef } from 'react';
import './crearCurso.css'
import "../modales.css"
import { GeneralContext } from '../../Context/Context';

import { POSTcurso } from '../POST';

function CrearCursoModal() {

    const { setModal, materias } = useContext(GeneralContext)

    // refs

    const Comision = useRef('');
    const Cuatrimestre = useRef('');
    const HoraInicio = useRef('');
    const HoraFin = useRef('');
    const Cupo = useRef('');
    const Materia = useRef('');

    return <>
        <div className="ModalTitulo">Crear nuevo curso</div>
        <div className="InputContainer">
            <div className="InputTitulo">Comision </div>
            <input ref={Comision} type="text" className="Input">
            </input>
        </div>
        <div className="InputContainer">
            <div className="InputTitulo">Cuatrimestre </div>
            <select ref={Cuatrimestre} className="Input">
                <option value={"Primer Cuatrimestre"}>Primer Cuatrimestre</option>
                <option value={"Segundo Cuatrimestre"}>Segundo Cuatrimestre</option>
            </select>
        </div>
        <div className="InputContainer">
            <div className="InputTitulo">Hora inicio</div>
            <input ref={HoraInicio} type="time" className="Input">
            </input>
        </div>
        <div className="InputContainer">
            <div className="InputTitulo">Hora fin</div>
            <input ref={HoraFin} type="time" className="Input">
            </input>
        </div>

        <div className="InputContainer">
            <div className="InputTitulo">Cupo </div>
            <input ref={Cupo} type="text" className="Input">
            </input>
        </div>

        <div className="InputContainer">
            <div className="InputTitulo">Materia </div>
            <select ref={Materia} className="Input">
                {materias.map((mat, key) => {
                    return <option key={key} value={mat.id}>{mat.nombre}</option>
                })}
            </select>
        </div>
        <div className="botonContainer">
            <button onClick={() => { setModal(undefined) }} className="botonCancelar">Cancelar</button>
            <button onClick={() => {
                setModal(undefined); 
                POSTcurso(
                    Comision.current.value,
                    Cuatrimestre.current.value,
                    HoraInicio.current.value,
                    HoraFin.current.value,
                    Cupo.current.value,
                    Materia.current.value
                )
            }} className="botonSubir">Subir</button>
        </div>
    </>
}


export default CrearCursoModal