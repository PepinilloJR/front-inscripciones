
import { Link } from "react-router-dom"
import "./menu.css"



function Menu () {
    
    return <>
        <menu className="Menu">
            <Link className="botonLink" to="/">
                <button className="boton">Inscripciones</button>
            </Link>
            <Link className="botonLink" to="/ins">
                <button className="boton">Subir</button>
            </Link>
        </menu>
    </>


} 


export default Menu