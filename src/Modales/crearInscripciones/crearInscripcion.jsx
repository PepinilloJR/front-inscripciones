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

    return <div className="ModalContainer">
        <div className="Modal">

        <div className="ModalTitulo">Añade un archivo Excel</div>
        <CargarExcelComponent archivo={archivo} setArchivo={setArchivo} json={json} setJson={setJson} ></CargarExcelComponent>
        <div className="botonContainer"> 
            <button onClick={() => {setModal(undefined)}} className="botonCancelar">Cancelar</button>
            <button onClick={() => {
                POSTInscripcion(json); 
                setModal(undefined)

            }} className="botonSubir">Subir</button>
        </div>
        </div>

    </div>
}


export default CargarExcelModal