import { InsContext } from "../../Context/context"
import { useContext } from "react"

function Curso({ curso }) {

    const { cursoSelected, setCursoSelected, setAlumnosSelected } = useContext(InsContext)


    return <div onClick={() => { setCursoSelected(curso); setAlumnosSelected([]) }} className={curso === cursoSelected ? "listElementSelected" : "listElement"}>
        <div style={{fontSize: "calc(1.2vw + 1.2vh)" }} className="listData">Comision: {curso.comision}</div>
        <div className="listData">Inscriptos: {curso.inscriptos} / {curso.cupo}</div>
        <div className="listData">Periodo: {curso.cuatrimestre}</div>
        <div className="listData">Año: {curso.year}</div>
        <div className="listData">Hora inicio: {curso.hora_inicio}</div>
        <div className="listData">Hora fin: {curso.hora_fin}</div>
    </div>
}

export default Curso