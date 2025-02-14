import { useContext } from "react"
import { CurContext } from "../../Context/Context"


export function Cursado({cursado}) {

    const { cursadosSelected, setCursadosSelected } = useContext(CurContext)

    return <div onClick={
        ()=> {
            if (cursadosSelected.find(c => c === cursado)) {
                setCursadosSelected(cursadosSelected.filter(c => c !== cursado))
            } else {
                setCursadosSelected([...cursadosSelected, cursado])
            }
            console.log(cursadosSelected)
        }
    } className={cursadosSelected.find(c => c === cursado) ? "CursadoSelected" : "Cursado"}>
        <div>{cursado.alumno.legajo}</div>
        <div>{cursado.alumno.nombre}</div>
        <div>{cursado.curso.comision.codigo}</div>
        <div>{cursado.solicitudInscripcionTardia.materia.nombre}</div>

        </div>
}