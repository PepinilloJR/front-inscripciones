
import { useContext, useRef } from 'react';
import './crearAlumno.css'
import { GeneralContext } from '../../Context/Context';
import { FormatText } from '../../Components/useful';

function CrearAlumnoModal() {

    const { setCrearAlumnoOpen } = useContext(GeneralContext)

    // refs

    const legajo = useRef('');
    const nombre = useRef('');
    const apellido = useRef('');

    return <div className="CrearAlumnoContainer">
        <div className="CrearAlumnoModal">

            <div className="CrearAlumnoTitulo">Crear nuevo Alumno</div>
            <div className="InputContainer">
                <div className="InputAlumnoTitulo">Legajo </div>
                <input ref={legajo} type="text" className="InputAlumno">
                </input>
            </div>

            <div className="InputContainer">
                <div className="InputAlumnoTitulo">Nombre </div>
                <input ref={nombre} type="text" className="InputAlumno">
                </input>
            </div>

            <div className="InputContainer">
                <div className="InputAlumnoTitulo">Apellido </div>
                <input ref={apellido} type="text" className="InputAlumno">
                </input>
            </div>



            <div className="botonContainer">
                <button onClick={() => { setCrearAlumnoOpen(false) }} className="botonCancelarAlum">Cancelar</button>
                <button onClick={() => { setCrearAlumnoOpen(false); POSTalumno(
                    legajo.current.value,
                    nombre.current.value,
                    apellido.current.value
                ) }} className="botonSubirAlum">Subir</button>
            </div>
        </div>

    </div>
}


async function POSTalumno (legajo, nombre, apellido) {
    const leg = FormatText(legajo)
    const nom = FormatText(nombre)
    const ape = FormatText(apellido)
    
    try {
        const response = fetch("http://127.0.0.1:8000/alumnos/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                legajo: leg,
                nombre: nom,
                apellido: ape
            })
        })
    } catch (e) {
        console.log(e)
    }

}

export default CrearAlumnoModal