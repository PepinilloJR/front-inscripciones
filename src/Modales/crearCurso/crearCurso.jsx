
import { useContext, useRef, useState } from 'react';
import "../modales.css"
import { GeneralContext } from '../../Context/context';
import { FormatText } from '../../Services/useful';
import * as XLSX from 'xlsx';
import { POSTcurso, POSTcursos } from "../../Services/http"
import { HiMiniDocumentPlus } from "react-icons/hi2";

import CargarExcelComponent from '../../Components/uploadExcel';

function CrearCursoModal() {

    const { setModal, materias } = useContext(GeneralContext)

    const [subirExcel, setSubirExcel] = useState(false)

    const [archivo, setArchivo] = useState()

    const [json, setJson] = useState("No se cargo ningun archivo...")


    // refs

    const Comision = useRef('');
    const Cuatrimestre = useRef('');
    const HoraInicio = useRef('');
    const HoraFin = useRef('');
    const Cupo = useRef('');
    const Materia = useRef('');

    return !subirExcel ? <>
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
                    FormatText(Comision.current.value),
                    FormatText(Cuatrimestre.current.value),
                    FormatText(HoraInicio.current.value),
                    FormatText(HoraFin.current.value),
                    FormatText(Cupo.current.value),
                    FormatText(Materia.current.value)
                )
            }} className="botonSubir">Subir</button>
            <button onClick={() => { setSubirExcel(true) }} className="botonOption">Cargar Excel</button>
        </div>
    </> 
    : 
    <>
    <CargarExcelComponent archivo={archivo} setArchivo={setArchivo} json={json} setJson={setJson}></CargarExcelComponent>
    <div className="botonContainer">
            <button onClick={() => { setModal(undefined) }} className="botonCancelar">Cancelar</button>
            <button onClick={() => {
                setModal(undefined); 
                POSTcursos(
                    json
                )
            }} className="botonSubir">Subir</button>
        <button onClick={() => { setSubirExcel(false) }} className="botonOption">Cargar curso individual</button>
    </div>
    </>
}




export default CrearCursoModal