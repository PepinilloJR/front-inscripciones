import { useContext, useEffect, useRef, useState } from "react"
import { GeneralContext } from "../../Context/Context"
import { BsChevronRight  } from "react-icons/bs";
import { BsChevronLeft  } from "react-icons/bs";


function Inscripciones() {
    const GContext = useContext(GeneralContext)

    const { materiasFilter } = useContext(GeneralContext)

    const Slider = useRef()
    const [desplazamiento, setDesplazamiento] = useState(0)
    const ndes = useRef(0)
    
    const [listMaterias, setListMaterias] = useState(GContext.materias) // lista de materias filtrada

    // cambio las materias que se muestran, al cambiar el filtro, que se cambia el el searchBar
    useEffect(() => {
        setListMaterias(GContext.materias?.filter((e) => e.Materia.toLowerCase().includes(materiasFilter.toLowerCase())))

        // reinicio el slider
        ndes.current = 0; 
        manejarResize();

        console.log(materiasFilter.toLowerCase())
    }, [materiasFilter])


    // actualizar el tamaño del desplazamiento cuando se genera un resize, para memorizar la posicion en la que estaba el usuario
    // al cambiar el tamaño de la ventana

    const manejarResize = () => {
            
        const longitudLineas = 3 // la cantidad de materias que hay en cada linea

        var desplazamientoDerecho = Slider.current?.getBoundingClientRect().width

        if (navigator.userAgent.includes("Firefox")) {
            desplazamientoDerecho = desplazamientoDerecho * longitudLineas
        }

        setDesplazamiento(-ndes.current * desplazamientoDerecho)
    }

    useEffect(() => {

        window.addEventListener("resize", manejarResize)

        return () => {
            window.removeEventListener("resize", manejarResize)
        }
    }, [])

    return <div className="MateriasSliderContainer">
        <BsChevronLeft onClick={ () => {
            const longitudLineas = 3 // la cantidad de materias que hay en cada linea

            var desplazamientoIzquierdo = Slider.current?.getBoundingClientRect().width

            // detectar si es firefox, debido a sus diferencias en la implementacion del flexbox
            if (navigator.userAgent.includes("Firefox")) {
                desplazamientoIzquierdo = desplazamientoIzquierdo * longitudLineas
            }

            if (desplazamiento < 0) {
                ndes.current = ndes.current - 1
                setDesplazamiento(-ndes.current * desplazamientoIzquierdo)
            }

        }} className="SliderButton">
        </BsChevronLeft>
        <div className="MateriasSlider">    

            <div ref={Slider} style={{transform: `translateX(${desplazamiento}px)`}} className="MateriasLista">
            {listMaterias.map((value, key) => {
                return <Inscripcion ins={value} key={key}/>
            })}
            </div>

        </div>
        <BsChevronRight onClick={ () => {

            const cantidadMaterias = 6 // cantidad de materias que iran a pantalla 
            const longitudLineas = 3 // la cantidad de materias que hay en cada linea


            var desplazamientoMaximo = Math.floor((listMaterias.length / cantidadMaterias) - 0.1) * longitudLineas
            var desplazamientoDerecho = Slider.current?.getBoundingClientRect().width
            
            // detectar si es firefox, debido a sus diferencias en la implementacion del flexbox
            if (navigator.userAgent.includes("Firefox")) {
                desplazamientoDerecho = desplazamientoDerecho * longitudLineas
            }

            if (ndes.current * 3 < desplazamientoMaximo) {
                ndes.current = ndes.current + 1
                setDesplazamiento(-ndes.current * desplazamientoDerecho)
            }
        }} className="SliderButton"/>
    </div>

}


function Inscripcion ({ins}) {

    return <>
    <div className="Materia">
        <div className="MateriaTitulo">
            {ins.Materia}
        </div> 
    </div>
    </>

}


export default Inscripciones