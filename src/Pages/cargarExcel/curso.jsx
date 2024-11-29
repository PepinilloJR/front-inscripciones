import { useState } from "react"

function Curso({value}) {


    const [seleccion, setSeleccion] = useState()

    return (
        <div className="Curso">
            <div onClick={() => {
                setSeleccion(!seleccion)
            }} className="Comision" >
                {value[0]}
            </div>
            <div>
                {seleccion ? value[1].map((materia, key_) => {

                    return <Materia key={key_} materia={materia}></Materia>
                }
                ) : <div></div>
                }
            </div>
        </div>
    )


}

//<div key={key_} className="Materia">
//                        {materia.materia}
//                        <div className="">
//                            {tieneAlumnos ? materia.alumnos[0].Nombre : "sin inscripciones" }
//                       </div>
//                    </div>

function Materia({materia}) {

    const [seleccion, setSeleccion] = useState(false)

    return <><div onClick={()=> {setSeleccion(!seleccion)}} className={seleccion ? "MateriaSeleccionada" : "Materia"}>
        {materia.materia}
        </div>
        <div>
            {seleccion ?
            <div className="Inscripciones">
                {materia.alumnos !== undefined ? materia.alumnos.map((alumno, key) => {
                    return <div className="Alumno">
                        <div>{alumno.Nombre}</div>
                    </div>
                }) : "sin inscripciones" }
            </div> : <div></div>}
        </div>
        </>
}

export default Curso