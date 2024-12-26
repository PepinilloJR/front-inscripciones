
import { useContext, useRef } from 'react';
import './crearCurso.css'
import { GeneralContext } from '../../Context/Context';
import { FormatText } from '../../Components/useful';

function CrearCursoModal() {

    const { setCrearCursoOpen, materias } = useContext(GeneralContext)

    // refs

    const Comision = useRef('');
    const Cuatrimestre = useRef('');
    const HoraInicio = useRef('');
    const HoraFin = useRef('');
    const Cupo = useRef('');
    const Materia = useRef('');

    return <div className="CrearCursoContainer">
        <div className="CrearCursoModal">

            <div className="CrearCursoTitulo">Crear nuevo curso</div>
            <div className="InputContainer">
                <div className="InputCursoTitulo">Comision </div>
                <input ref={Comision} type="text" className="InputCurso">
                </input>
            </div>
            <div className="InputContainer">
                <div className="InputCursoTitulo">Cuatrimestre </div>
                <select ref={Cuatrimestre} className="InputCurso">
                    <option value={"Primer Cuatrimestre"}>Primer Cuatrimestre</option>
                    <option value={"Segundo Cuatrimestre"}>Segundo Cuatrimestre</option>
                </select>
            </div>
            <div className="InputContainer">
                <div className="InputCursoTitulo">Hora inicio</div>
                <input ref={HoraInicio} type="time" className="InputCurso">
                </input>
            </div>
            <div className="InputContainer">
                <div className="InputCursoTitulo">Hora fin</div>
                <input ref={HoraFin} type="time" className="InputCurso">
                </input>
            </div>

            <div className="InputContainer">
                <div className="InputCursoTitulo">Cupo </div>
                <input ref={Cupo} type="text" className="InputCurso">
                </input>
            </div>

            <div className="InputContainer">
                <div className="InputCursoTitulo">Materia </div>
                <select ref={Materia} className="InputCurso">
                    {materias.map((mat, key)=> {
                        return <option key={key} value={mat.id}>{mat.nombre}</option>
                    })}
                </select>
            </div>
            <div className="botonContainer">
                <button onClick={() => { setCrearCursoOpen(false) }} className="botonCancelarCur">Cancelar</button>
                <button onClick={() => { setCrearCursoOpen(false); POSTcurso(
                    Comision.current.value,
                    Cuatrimestre.current.value, 
                    HoraInicio.current.value, 
                    HoraFin.current.value, 
                    Cupo.current.value, 
                    Materia.current.value
                ) }} className="botonSubirCur">Subir</button>
            </div>
        </div>

    </div>
}


async function POSTcurso (Comision, Cuatrimestre, HoraInicio, HoraFin, Cupo, Materia) {
    const com = FormatText(Comision)
    const hin = FormatText(HoraInicio)
    const hfi = FormatText(HoraFin)
    
    try {
        const response = fetch("http://127.0.0.1:8000/cursos/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comision: com,
                cuatrimestre: Cuatrimestre,
                hora_inicio: hin,
                hora_fin: hfi,
                cupo: Cupo,
                materia: Materia
            })
        })
    } catch (e) {
        console.log(e)
    }

}

export default CrearCursoModal