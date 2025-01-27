import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import { GETcursados } from '../../Services/http';
import { Cursado } from './cursado';
import "./cursados.css"
import { CurContext } from '../../Context/Context'
import SearchBar from '../../Components/searchbar';
import { BiMenuAltLeft } from "react-icons/bi";

import CursadosList from './cursadoList';
import CursadosSelectors from './cursadosSelectors';
import CursadosFiltrosSection from './filtros';

function Cursados() {
    const [cursados, setCursados] = useState()
    const [cursos, setCursos] = useState()
    const [cursadosSelected, setCursadosSelected] = useState([])
    const [filtro, setFiltro] = useState("")
    const [filtroOptions, setFiltroOptions] = useState([])

    const [optionsSelected, setOptionsSelected] = useState(false)


    useEffect(()=> {
        const obtenerCursados = async () => {
            setCursados(await GETcursados())
        }
        obtenerCursados()
    },[])


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

            }}>
        <div className="PageContainer">

            <CursadosFiltrosSection></CursadosFiltrosSection>
            
            <div className="CursadosSection">
                <div className="CursadosContainer">
                    <CursadosSelectors></CursadosSelectors>
                    <CursadosList></CursadosList>
                    
                    
                    
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