
import { useContext, useEffect, useRef, useState } from 'react';
import "../modales.css"
import { GeneralContext } from "../../Context/Context";


import { POSTalumno } from "../../Services/http"

import { FormatText } from '../../Services/useful';

function CrearAlumnoModal() {

    const { setModal } = useContext(GeneralContext)

    const [mensajeResultado, setMensajeResultado] = useState()

    const [legajo, setLegajo] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const [permitirSubir, setPermitirSubir] = useState(false)


    useEffect(() => {
        setPermitirSubir(legajo !== "" && nombre !== "" && apellido !== "")
    }, [legajo, nombre, apellido])

    return <>

        <div className="ModalTitulo">Crear nuevo Alumno</div>
        <div className="InputContainer">
            <div className="InputTitulo">Legajo </div>
            <input onChange={(E) => {
                setLegajo(E.target.value)
            }} type="text" className="Input">
            </input>
        </div>

        <div className="InputContainer">
            <div className="InputTitulo">Nombre </div>
            <input onChange={(E) => {
                setNombre(E.target.value)
            }}  type="text" className="Input">
            </input>
        </div>

        <div className="InputContainer">
            <div className="InputTitulo">Apellido </div>
            <input onChange={(E) => {
                setApellido(E.target.value)
            }} type="text" className="Input">
            </input>
        </div>
        
        <div className='MessageContainer'>
            <div className={mensajeResultado?.status === "ok" ? 'MessageSuccess' : 'MessageError'}>{mensajeResultado?.message}</div>
        </div>

        <div className="botonContainer">
            <button onClick={() => { setModal(undefined) }} className="botonCancelar">Cancelar</button>
            <button onClick={async () => {
                //setModal(undefined); 
                const mensaje = await POSTalumno(
                    FormatText(legajo),
                    FormatText(nombre),
                    FormatText(apellido)
                )
                console.log(mensaje.message)
                setMensajeResultado(mensaje)
            }} className={permitirSubir ? "botonSubir" : "botonSubirDisabled"}>Subir</button>
        </div>
    </>
}

export default CrearAlumnoModal