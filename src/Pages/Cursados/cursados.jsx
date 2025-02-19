import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import { GETcursados } from '../../Services/http';
import "../Pages.css"
import { CurContext } from '../../Context/Context'
import CursadosList from './cursadoList';
import CursadosSelectors from './cursadosSelectors';
import CursadosFiltrosSection from './filtros';

function Cursados() {
    const [cursados, setCursados] = useState()
    const [cursadosFiltrados, setCursadosFIltrados] = useState()
    const [cursos, setCursos] = useState()
    const [cursadosSelected, setCursadosSelected] = useState([])
    const [filtro, setFiltro] = useState("")
    const [filtroOptions, setFiltroOptions] = useState([])

    const [optionsSelected, setOptionsSelected] = useState(false)

    const [optionMateria, setOptionMateria] = useState(true)
    const [optionCurso, setOptionCurso] = useState(true)
    const [optionAlumno, setOptionAlumno] = useState(true)
    const [optionYear, setOptionYear] = useState(new Date().getFullYear().toString())

    console.log(optionYear)

    useEffect(()=> {
        const obtenerCursados = async () => {
            setCursados(await GETcursados())
        }
        obtenerCursados()
    },[])


    useEffect(() => {
        setCursadosSelected([])
    }, [filtro, optionYear])

    return <>
        <CurContext.Provider value={{
            cursadosSelected, 
            setCursadosSelected,
            cursados,
            cursos,
            setCursos,
            filtro,
            setFiltro,
            filtroOptions,
            setFiltroOptions,
            optionsSelected,
            setOptionsSelected,
            optionMateria,
            setOptionMateria,
            optionCurso,
            setOptionCurso,
            optionAlumno,
            setOptionAlumno,
            cursadosFiltrados,
            setCursadosFIltrados,
            optionYear,
            setOptionYear

            }}>
        <div className="PageContainer">

            <CursadosFiltrosSection></CursadosFiltrosSection>

            <div className="PrincipalSection">
                <div className="SectionContainer">
                    <CursadosSelectors></CursadosSelectors>
                    <CursadosList></CursadosList>
                    <div className='ButtonsContainer'>
                        <button onClick={()=> {
                            parseToExcelFile(cursadosSelected)
                        }} className={cursadosSelected?.length === 0 ? 'DisabledButton': 'SendButton'} disabled={cursadosSelected?.length === 0}>
                            Exportar Excel
                        </button>
                    </div>
                </div>
            </div>

        </div>
        </CurContext.Provider>
    </>
}

function parseToExcelFile(json) {

    const json_correguido = json.map((i) => {
        return {
            alumno: i.alumno.nombre + " " + i.alumno.apellido,
            legajo: i.alumno.legajo,
            comision: i.curso.comision.codigo,
            materia: i.curso.materia.nombre,
            estado: i.estado,
            año: i.año

        }
    })
    console.log(json_correguido)

    const sheet = XLSX.utils.json_to_sheet(json_correguido)

    const workBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, sheet)

    XLSX.writeFile(workBook, "inscriptos.xlsx")
}


export default Cursados