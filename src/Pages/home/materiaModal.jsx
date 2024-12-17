import { useContext, useEffect, useState } from "react"
import { GeneralContext } from "../../Context/Context"



function MateriaModal() {

    const { materiaSelected, setMateriaSelected } = useContext(GeneralContext)

    const [comisiones, setComisiones] = useState()
    const [alumnos, setAlumnos] = useState()


    useEffect(() => {
        getComiciones(setComisiones)
    }, [])

    return <div className="MateriaModalContainer">

        <div className="MateriaModal">
            <div className="MateriaModalTitulo">
                {materiaSelected.Materia}

            </div>

            <div className="MateriaModalContent">
                <div className="Comisiones">
                    {comisiones?.map((c, key) => {
                        return <div key={key}>{c.Comision}</div>
                    })}
                </div>

                <div className="AlumnosContainer">
                    {alumnos?.map((a, key)=> {
                        return <div key={key}>{a.Alumno}</div>
                    })}
                </div>

            </div>

        </div>

    </div>
}

// POR AHORA NO HACE NADA MAS QUE LEER UN JSON, tendria que hacer un get con la materia actual y tomar sus comisiones
async function getComiciones(setComisiones) {
    try {
        const response = await fetch("/comisiones.json", {
            headers: {
                'Accept': 'application/json'
            }
        })
        setComisiones(await response.json())
    } catch (error) {
        console.log(error)
    }

}


export default MateriaModal