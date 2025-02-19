import "../modales.css"

import { useContext, useState } from "react";
import * as XLSX from 'xlsx';
import { GeneralContext } from "../../Context/Context";
import { FormatText } from '../../Services/useful.js';

import { POSTInscripcion } from "../../Services/http.js";

import CargarExcelComponent from "../../Components/uploadExcel.jsx";

function CargarExcelModal() {

    const {setModal} = useContext(GeneralContext)

    const [archivo, setArchivo] = useState()
    const [json, setJson] = useState("No se cargo ningun archivo...")

    const [mensajeResultado, setMensajeResultado] = useState()

    return <div className="ModalContainer">
        <div className="Modal">

        <div className="ModalTitulo">Añade un archivo Excel</div>
        <CargarExcelComponent archivo={archivo} setArchivo={setArchivo} json={json} setJson={setJson} ListaErrores={mensajeResultado?.body} ></CargarExcelComponent>
        <div className='MessageContainer'>
            <div className={mensajeResultado?.status === "ok" ? 'MessageSuccess' : 'MessageError'}>{mensajeResultado?.message}</div>
        </div>

        <div className="botonContainer"> 
            <button onClick={() => {setModal(undefined)}} className="botonCancelar">Cancelar</button>
            <button onClick={async () => {
                const mensaje = await POSTInscripcion(json); 
                setMensajeResultado(mensaje)

            }} className={json !== "No se cargo ningun archivo..." ? "botonSubir" : "botonSubirDisabled"} disabled={json === "No se cargo ningun archivo..."}>Subir</button>
        </div>
        </div>

    </div>
}


export default CargarExcelModal