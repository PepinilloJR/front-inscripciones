import { useContext, useEffect, useRef, useState } from "react"
import { GeneralContext } from "../../Context/Context"
import { BsChevronRight  } from "react-icons/bs";
import { BsChevronLeft  } from "react-icons/bs";


function Inscripciones() {
    const GContext = useContext(GeneralContext)
    const Slider = useRef()
    const [desplazamiento, setDesplazamiento] = useState(0)
    const ndes = useRef(0)
    
    // aplicar el desplazamiento cuando se hace zoom o cambia la ventana, ya que el translate es en pixeles
    useEffect(() => {

        const manejarResize = () => {
            console.log(ndes.current)
            setDesplazamiento(ndes.current * (Slider.current?.getBoundingClientRect().width))
        }

        window.addEventListener("resize", manejarResize)

        return () => {
            window.removeEventListener("resize", manejarResize)
        }
    }, [])

    return <div className="InscripcionesSliderContainer">
        
        <BsChevronLeft onClick={ () => {
            // esto depende del estilo y tamaño de las inscripciones
            if (desplazamiento < 0) {
                ndes.current = ndes.current + 1
                setDesplazamiento(ndes.current * (Slider.current?.getBoundingClientRect().width))
            }
        }} className="SliderButton">
        </BsChevronLeft>
        <div className="InscripcionesSlider">    
            <div ref={Slider} style={{transform: `translateX(${desplazamiento}px)`}} className="InscripcionesLista">
            {GContext.inscripciones?.map((value, key) => {
                return <Inscripcion ins={value} key={key}/>
            })}
            </div>
        </div>
        <BsChevronRight onClick={ () => {
            const cantidadMaterias = 6 // cantidad de materias que iran a pantalla 
            var cantidad = Math.floor((GContext.inscripciones.length / cantidadMaterias) - 0.1)
            var limiteDerecho = (cantidad * Slider.current?.getBoundingClientRect().width * 3)
            
            if (desplazamiento > -limiteDerecho) {
                ndes.current = ndes.current - 1
                setDesplazamiento(ndes.current * (Slider.current?.getBoundingClientRect().width))
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
    </div>
    </>

}


export default Inscripciones