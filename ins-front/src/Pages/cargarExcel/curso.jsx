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
                    return <div key={key_} className="Materia">
                        {materia.materia}
                    </div>
                }
                ) : <div></div>
                }
            </div>
        </div>
    )


}


export default Curso