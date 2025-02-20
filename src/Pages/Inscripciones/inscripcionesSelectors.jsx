import { useContext, useEffect, useRef, useState } from "react"
import { InsContext } from "../../Context/Context"

function InscripcionesSelectors() {

    const { setInscripcionesSelected, insPosibles, checkRef, inscripcionesSelected, inscripcionesFiltradas } = useContext(InsContext)

    return <>
        <div className="Selectors">


            <label className="Checkbox">
                <input ref={checkRef} type="checkbox" onChange={(e) => {
                    console.log(e.target.checked)
                    if (!e.target.checked) {
                        setInscripcionesSelected([])
                    }
                    else {
                        setInscripcionesSelected(insPosibles)
                    }

                }} ></input>
                Seleccionar {insPosibles?.length} posibles inscripciones
            </label>

            <div className="SelectedCount">Seleccionados: {inscripcionesSelected?.length}/{inscripcionesFiltradas?.length}</div>

        </div>
    </>
}

export default InscripcionesSelectors