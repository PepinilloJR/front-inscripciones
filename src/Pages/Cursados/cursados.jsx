import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import { GETcursados } from '../../Services/http';
import { Cursado } from './cursado';
import "./cursados.css"
import { CurContext } from '../../Context/Context'

function Cursados() {
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
        <CurContext.Provider value={{cursadosSelected, setCursadosSelected}}>
        <div className="PageContainer">
            <div className="FiltrosSection">

            </div>

            <div className="CursadosSection">
                <div className="CursadosContainer">
                    <div className="SelectorsContainer"></div>
                    <div className="CursadosListBox">
                        <div className='CursadosList'>
                        {cursados?.map((c, key) => {

                            return <Cursado cursado={c} key={key}></Cursado>
                        })}
                        </div>
                    </div>
                    <div className='ButtonsContainer'>
                        <button onClick={()=> {
                            parseToExcelFile(cursadosSelected)
                        }} className='ExportarButton'>
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

    const sheet = XLSX.utils.json_to_sheet(json)

    const workBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workBook, sheet)

    XLSX.writeFile(workBook, "inscriptos.xlsx")
}


export default Cursados