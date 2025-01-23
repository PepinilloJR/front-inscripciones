import { useContext, useEffect, useState } from "react"
import DescargarExcelComponet from "../../Components/downloadExcel"
import * as XLSX from 'xlsx';
import { CurContext } from "../../Context/Context"
import { GETcursados } from "../../Services/http"


function CursadosModal() {


    const [cursados, setCursados] = useState()
    const [cursos, setCursos] = useState()
    const [cursadosSelected, setCursadosSelected] = useState([])

    useEffect(()=> {
        const obtenerCursados = async () => {
            setCursados(await GETcursados())
        }
        obtenerCursados()
    },[])


    return <>
    <CurContext.Provider value={{}}>
        <button onClick={()=> {parseToExcelFile(cursados)}} className="Exportar">Exportar</button>

        <div className="list">
        </div>
    
    
    </CurContext.Provider>
    </>
}


function parseToExcelFile(json) {

    const sheet = XLSX.utils.json_to_sheet(json)

    const workBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, sheet)

    XLSX.writeFile(workBook, "inscriptos.xlsx")
}


export default CursadosModal