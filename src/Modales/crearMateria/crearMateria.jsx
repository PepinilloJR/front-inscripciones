import { useContext, useRef } from "react"
import { GeneralContext } from "../../Context/Context"
import './crearMateria.css'
import { FormatText } from "../../Components/useful"

function CrearMateriaModal() {

    const {setCrearMateriaOpen} = useContext(GeneralContext)

    const NombreRef = useRef("")


    return <div className="CrearMateriaContainer">
            <div className="CrearMateriaModal">
    
            <div className="CrearMateriaTitulo">Crear nueva materia</div>
            <div className="InputNombreContainer">
                <div className="InputNombreTitulo">Nombre </div>
                <input ref={NombreRef} type="text" className="InputNombre"> 
                </input>
            </div>
            <div className="botonContainer"> 
                <button onClick={() => {setCrearMateriaOpen(false)}} className="botonCancelarMat">Cancelar</button>
                <button onClick={() => {POSTmateria(NombreRef.current.value); setCrearMateriaOpen(false)}} className="botonSubirMat">Subir</button>
            </div>
            </div>
    
        </div>
}


async function POSTmateria(nombre_materia) {
    

    const nombre = FormatText(nombre_materia)
    try {
        const response = await fetch("http://127.0.0.1:8000/materias/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }, body: JSON.stringify({
                "nombre": nombre
            })
                
        })
        console.log(response)

    } catch (e) {
        console.log(e)
    }

}

export default CrearMateriaModal