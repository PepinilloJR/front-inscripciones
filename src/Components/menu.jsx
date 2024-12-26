import { MdFileUpload } from "react-icons/md";
import { Link } from "react-router-dom"
import "./menu.css"
import { GeneralContext } from "../Context/Context";
import { useContext } from "react";


function Menu () {
    
    const GContext = useContext(GeneralContext)


    return <>
        <menu className="Menu">
        
            <Link onClick={() => {GContext.setSubirOpen(true)
            }} className="botonLink" to="/">
                <MdFileUpload className="UploadBoton"></MdFileUpload>
                <button className="boton">Subir Inscripciones</button>
            </Link>
            <Link onClick={() => {GContext.setCrearMateriaOpen(true)
            }} className="botonLink" to="/">
                <button className="boton">Crear materia</button>
            </Link>
            <Link onClick={() => {GContext.setCrearCursoOpen(true)
            }} className="botonLink" to="/">
                <button className="boton">Crear curso</button>
            </Link>
        </menu>
    </>


} 


export default Menu