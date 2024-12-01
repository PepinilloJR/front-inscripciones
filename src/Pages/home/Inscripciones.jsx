import { useContext, useEffect, useRef, useState } from "react"
import { GeneralContext } from "../../Context/Context"
import { BsChevronRight  } from "react-icons/bs";
import { BsChevronLeft  } from "react-icons/bs";


function Inscripciones() {
    const GContext = useContext(GeneralContext)
    const Slider = useRef()
    
    const [desplazamiento, setDesplazamiento] = useState(0)

    return <div className="InscripcionesSliderContainer">
        
        <BsChevronLeft onClick={ () => {
            // esto depende del estilo y tamaño de las inscripciones
            if (desplazamiento < 0) {
                setDesplazamiento((desplazamiento + (12 + 0.65 * 2) * 3))
                console.log(desplazamiento)
            }
        }} className="SliderButton">
        </BsChevronLeft>

        <div ref={Slider} className="InscripcionesSlider">    
            <div style={{transform: `translateX(calc(${desplazamiento}vw + ${desplazamiento}vh))`}} className="InscripcionesLista">
            {GContext.inscripciones?.map((value, key) => {
                return <Inscripcion ins={value} key={key}/>
            })}
            </div>
        </div>

        <BsChevronRight onClick={ () => {
            // esto depende del estilo y tamaño de las inscripciones

            const cantidadMaterias = 6 // cantidad de materias que iran a pantalla 
            const cantidadColumnas = 3 // cantidad de materias en cada fila que se muestra en pantalla

            var cantidad = Math.floor((GContext.inscripciones.length / cantidadMaterias) - 0.1)
            var limiteDerecho = cantidad * ( 12 + 0.65 * 2) * cantidadColumnas
            

            if (desplazamiento > -limiteDerecho) {
                setDesplazamiento(desplazamiento - ( 12 + 0.65 * 2) * 3)
            }
        }} className="SliderButton"/>

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