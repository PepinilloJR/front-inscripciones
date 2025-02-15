
import { useContext, useEffect, useRef, useState } from 'react';
import "../modales.css"
import { GeneralContext } from "../../Context/Context";

import { FormatText } from '../../Services/useful';
import * as XLSX from 'xlsx';
import { GETmaterias, POSTcurso, POSTcursos } from "../../Services/http"
import { HiMiniDocumentPlus } from "react-icons/hi2";

import CargarExcelComponent from '../../Components/uploadExcel';
import { use } from 'react';

function CrearCursoModal() {

    const { setModal, archivo, setArchivo } = useContext(GeneralContext)

    const [subirExcel, setSubirExcel] = useState(false)

    const [json, setJson] = useState("No se cargo ningun archivo...")

    const [mensajeResultado, setMensajeResultado] = useState()

    const [materias, setMaterias] = useState([])

    useState(() => {
        const obtenerMaterias = async () => {
            setMaterias(await GETmaterias())
        }
        obtenerMaterias()
    }, [])


    // refs

    const [comision, setComision] = useState("");
    const [cuatrimestre, setCuatrimestre] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [cupo, setCupo] = useState("");
    const [inscriptos, setInscriptos] = useState("");
    const [materia, setMateria] = useState("");

    const [permitirSubirIndividual, setPermitirSubirIndividual] = useState(false)
    const [permitirSubirExcel, setPermitirSubirExcel] = useState(false)

    useEffect(() => {
        setPermitirSubirIndividual(comision !== "" && cuatrimestre !== "" && horaFin !== "" && horaInicio !== "" && cupo !== "" && inscriptos !== ""
            && materia !== "") 
        setPermitirSubirExcel(json !== "No se cargo ningun archivo...")
    }, [comision, cuatrimestre, horaFin, horaInicio, cupo, inscriptos, materia, json])

    return !subirExcel ? <>
        <div className="ModalTitulo">Crear nuevo curso</div>
        <div className="InputContainer">
            <div className="InputTitulo">Comision </div>
            <input onChange={(E)=> {
               setComision(E.target.value)
            }} type="text" className="Input">
            </input>
        </div>
        <div className="InputContainer">
            <div className="InputTitulo">Cuatrimestre </div>
            <select onChange={(E)=> {
               setCuatrimestre(E.target.value)
            }} className="Input">
                <option value={""}>Sin seleccionar</option>
                <option value={"Primer Cuatrimestre"}>Primer Cuatrimestre</option>
                <option value={"Segundo Cuatrimestre"}>Segundo Cuatrimestre</option>
            </select>
        </div>
        <div className="InputContainer">
            <div className="InputTitulo">Hora inicio</div>
            <input onChange={(E)=> {
               setHoraInicio(E.target.value)
            }}  type="time" className="Input">
            </input>
        </div>
        <div className="InputContainer">
            <div className="InputTitulo">Hora fin</div>
            <input onChange={(E)=> {
               setHoraFin(E.target.value)
            }}  type="time" className="Input">
            </input>
        </div>

        <div className="InputContainer">
            <div className="InputTitulo">Cupo </div>
            <input onChange={(E)=> {
               setCupo(E.target.value)
            }}  type="text" className="Input">
            </input>
        </div>
        <div className="InputContainer">
            <div className="InputTitulo">Inscriptos </div>
            <input onChange={(E)=> {
               setInscriptos(E.target.value)
            }}   type="text" className="Input">
            </input>
        </div>

        <div className="InputContainer">
            <div className="InputTitulo">Materia </div>
            <select onChange={(E)=> {
               setMateria(E.target.value)
            }}   className="Input">
                <option value={""}>Sin seleccionar</option>
                {materias?.map((mat, key) => {
                    return <option key={key} value={mat.nombre}>{mat.nombre}</option>
                })}
            </select>
        </div>


        <div className='MessageContainer'>
            <div className={mensajeResultado?.status === "ok" ? 'MessageSuccess' : 'MessageError'}>{mensajeResultado?.message}</div>
        </div>


        <div className="botonContainer">
            <button onClick={() => { setModal(undefined) }} className="botonCancelar">Cancelar</button>
            <button onClick={async () => {

                const mensaje = await POSTcursos([{
                    materia: FormatText(materia),
                    comision: FormatText(comision),
                    cuatrimestre: FormatText(cuatrimestre),
                    hora_inicio: FormatText(horaInicio),
                    hora_fin: FormatText(horaFin),
                    cupo: FormatText(cupo),
                    inscriptos: FormatText(inscriptos)

                }])
                setMensajeResultado(mensaje)
            }} className={permitirSubirIndividual ? "botonSubir" : "botonSubirDisabled"} disabled={!permitirSubirIndividual}>Subir</button>
            <button onClick={() => { setSubirExcel(true) }} className="botonOption">Cargar Excel</button>
        </div>
    </> 
    : 
    <>
    <CargarExcelComponent archivo={archivo} setArchivo={setArchivo} json={json} setJson={setJson}></CargarExcelComponent>
    <div className='MessageContainer'>
        <div className={mensajeResultado?.status === "ok" ? 'MessageSuccess' : 'MessageError'}>{mensajeResultado?.message}</div>
    </div>

    <div className="botonContainer">
            <button onClick={() => { setModal(undefined) }} className="botonCancelar">Cancelar</button>
            <button onClick={async () => {
                //setModal(undefined); 
                console.log(json)
                const mensaje = await POSTcursos(
                    json
                )
                setMensajeResultado(mensaje)
            }} className={permitirSubirExcel ? "botonSubir" : "botonSubirDisabled"} disabled={!permitirSubirExcel}>Subir</button>
        <button onClick={() => { setSubirExcel(false); }} className="botonOption">Cargar curso individual</button>
    </div>
    </>
}




export default CrearCursoModal