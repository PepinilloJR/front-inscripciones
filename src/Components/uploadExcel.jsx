import { useEffect, useRef } from "react";
import * as XLSX from 'xlsx';
import { FormatText } from "../Services/useful";
import { HiMiniDocumentPlus } from "react-icons/hi2";

import './uploadExcel.css'

function CargarExcelComponent({archivo, setArchivo, json, setJson}) {

    const inputArchivo = useRef()

    const CargarJson = async () => {
        setJson(await parseToJsonFile(archivo))
    }

    useEffect(() => {
        if (archivo) {
            CargarJson()
        }
    }, [archivo])


    return <>
        <label htmlFor="subir" className="InputArchivoContainer">
            <HiMiniDocumentPlus fill="black" className="InputArchivo"></HiMiniDocumentPlus>
        </label>
        <input ref={inputArchivo} type="file" onChange={() => {
            setArchivo(inputArchivo.current.files[0])
        }} id="subir"></input>
        <div className="ExcelJsonContainer">
            {JSON.stringify(json, null, 4)}
        </div>
    </>
}

async function parseToJsonFile(archivo) {

    let mapeos = await fetch("maping.json") 
    mapeos = await mapeos.json()


    return new Promise(async (resolve, reject) => {

        const fileReader = new FileReader()

        fileReader.onload = (evento) => {

            var datos = evento.target.result
            var sheets = XLSX.read(datos, { type: "array" })
            
            var Json = XLSX.utils.sheet_to_json(sheets.Sheets[sheets.SheetNames[0]])
            
            
            // mapea las propiedades obtenidas del excel a algo mas legible y util al backend
            const JsonLimpio = Json.map(object => {
                const nuevoObjeto = {}
                Object.keys(object).forEach(propiedad => {
                    
                    const nuevaPropiedad = mapeos.map[propiedad] || FormatText(propiedad)
                    nuevoObjeto[nuevaPropiedad] = FormatText(object[propiedad].toString())               
                    
                })
                return nuevoObjeto
            })

            resolve(JsonLimpio)
        }
        fileReader.readAsArrayBuffer(archivo)
    })

}


export default CargarExcelComponent