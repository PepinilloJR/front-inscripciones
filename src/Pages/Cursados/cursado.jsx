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
    } className={cursadosSelected.find(c => c === cursado) ? "ItemSelected" : "Item"}>
        <div className="Campo">{cursado.alumno.legajo}</div>
        <div className="Campo">{cursado.alumno.nombre + " " + cursado.alumno.apellido}</div>
        <div className="Campo">{cursado.curso.comision.codigo}</div>
        <div className="Campo">{cursado.solicitudInscripcionTardia.materia.nombre}</div>

        </div>
}