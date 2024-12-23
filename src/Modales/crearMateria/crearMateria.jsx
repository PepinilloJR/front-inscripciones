import { useContext } from "react"
import { GeneralContext } from "../../Context/Context"
import './crearMateria.css'

function CrearMateriaModal() {

    const {setCrearMateriaOpen} = useContext(GeneralContext)

    return <div className="CrearMateriaContainer">
            <div className="CrearMateriaModal">
    
            <div className="CrearMateriaTitulo">Crear nueva materia</div>

            <div className="botonContainer"> 
                <button onClick={() => {setCrearMateriaOpen(false)}} className="botonCancelar">Cancelar</button>
                <button onClick={() => {}} className="botonSubir">Subir</button>
            </div>
            </div>
    
        </div>
}


export default CrearMateriaModal