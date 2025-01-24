import { MdFileUpload } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa";

import { Link } from "react-router-dom"
import "./menu.css"
import { GeneralContext } from "../Context/Context";
import { useContext } from "react";
import CargarExcelModal from "../Modales/crearInscripciones/crearInscripcion";
import CrearAlumnoModal from "../Modales/crearAlumno/crearAlumno";
import CrearMateriaModal from "../Modales/crearMateria/crearMateria";
import CrearCursoModal from "../Modales/crearCurso/crearCurso";

function Menu () {
    
    const GContext = useContext(GeneralContext)


    return <>
        <menu className="Menu">
        
            <Link onClick={() => {GContext.setModal(<CargarExcelModal></CargarExcelModal>);
            }} className="botonLink" to="/">
                <MdFileUpload className="UploadBoton"></MdFileUpload>
                <button className="boton">Importar Inscripciones</button>
            </Link>
            <Link className="botonLink" to="/cursados">
                <FaFileExcel className="UploadBoton"></FaFileExcel>
                <button className="boton">Exportar Inscriptos</button>
            </Link>
            <Link onClick={() => {GContext.setModal(<CrearMateriaModal></CrearMateriaModal>)
            }} className="botonLink" to="/">
                <button className="boton">Crear materia</button>
            </Link>
            <Link onClick={() => {GContext.setModal(<CrearCursoModal></CrearCursoModal>)
            }} className="botonLink" to="/">
                <button className="boton">Crear curso</button>
            </Link>
            <Link onClick={() => {GContext.setModal(<CrearAlumnoModal></CrearAlumnoModal>)
            }} className="botonLink" to="/">
                <button className="boton">Crear alumno</button>
            </Link>
        </menu>
    </>


} 


export default Menu