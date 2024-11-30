import { useContext, useEffect, useRef } from "react"
import { GeneralContext } from "../../Context/Context"



function Inscripciones() {
    const GContext = useContext(GeneralContext)
    const Slider = useRef()

    
    return <div className="InscripcionesSliderContainer">
        
        <button className="SliderButton">{"<"}</button>

        <div ref={Slider} className="InscripcionesSlider">    
            <div className="InscripcionesLista">
            {GContext.inscripciones?.map((value, key) => {
                return <Inscripcion ins={value} key={key}/>
            })}
            </div>
        </div>

        <button className="SliderButton">{">"}</button>
    </div>

}


function Inscripcion ({ins}) {

    return <>
    <div className="Inscripcion">
        <div className="InscripcionTitulo">
            {ins.Materia}        
        </div> 
        <div className="ComisionesMiniList">
            lista aqui...
        </div>
    </div>
    </>

}


export default Inscripciones