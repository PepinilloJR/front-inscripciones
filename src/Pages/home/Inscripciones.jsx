import { useContext, useEffect, useRef, useState } from "react"
import { GeneralContext } from "../../Context/Context"



function Inscripciones() {
    const GContext = useContext(GeneralContext)
    const Slider = useRef()
    
    const [desplazamiento, setDesplazamiento] = useState(0)

    return <div className="InscripcionesSliderContainer">
        
        <button onClick={ () => {
            // esto depende del estilo y tamaño de las inscripciones
            setDesplazamiento((desplazamiento + (12 + 0.65 * 2) * 3))
            console.log(desplazamiento)
        }} className="SliderButton">{"<"}</button>

        <div ref={Slider} className="InscripcionesSlider">    
            <div style={{transform: `translateX(calc(${desplazamiento}vw + ${desplazamiento}vh))`}} className="InscripcionesLista">
            {GContext.inscripciones?.map((value, key) => {
                return <Inscripcion ins={value} key={key}/>
            })}
            </div>
        </div>

        <button onClick={ () => {
            // esto depende del estilo y tamaño de las inscripciones

            setDesplazamiento(desplazamiento - ( 12 + 0.65 * 2) * 3)
        }} className="SliderButton">{">"}</button>
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