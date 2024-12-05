import { IconContext } from "react-icons";
import "./cargarExcel.css"
import { HiMiniDocumentPlus } from "react-icons/hi2";
import { useContext, useEffect, useRef, useState } from "react";
import * as XLSX from 'xlsx';
import { GeneralContext } from "../../Context/Context";

function CargarExcel() {

    const GContext = useContext(GeneralContext)

    const [archivo, setArchivo] = useState()
    const [json, setJson] = useState("No se cargo ningun archivo...")

    const inputArchivo = useRef()

    const CargarJson =  async () => {
        setJson(await parseToJsonFile(archivo))
    }

    useEffect(() => {
        if (archivo) {
            CargarJson()
        }
    }, [archivo])


    return <div className="SubirExcelContainer">
        <div className="SubirExcelModal">

        <div className="InputTitulo">Añade un archivo Excel</div>
        <label htmlFor="subir" className="InputArchivoContainer">
            <HiMiniDocumentPlus fill="black" className="InputArchivo"></HiMiniDocumentPlus>
        </label>
        <input ref={inputArchivo} type="file" onChange={() => {
            setArchivo(inputArchivo.current.files[0])
        }} id="subir"></input>
        <div className="ExcelJsonContainer">
            {JSON.stringify(json, null, 4)}
        </div>
        <div className="botonContainer"> 
            <button onClick={() => {GContext.setSubirOpen(false)}} className="botonCancelar">Cancelar</button>
            <button onClick={() => {POSTInscripcion(json)}} className="botonSubir">Subir</button>
        </div>
        </div>

    </div>
}


function parseToJsonFile(archivo) {

    return new Promise(async (resolve, reject) => {

        const fileReader = new FileReader()

        fileReader.onload = (evento) => {

            var datos = evento.target.result
            var sheets = XLSX.read(datos, { type: "array" })
            
            var Json = XLSX.utils.sheet_to_json(sheets.Sheets[sheets.SheetNames[0]])
            resolve(Json)
        }
        fileReader.readAsArrayBuffer(archivo)
    })

}


async function POSTInscripcion(json) {

    try {
        const response = await fetch("http://127.0.0.1:8000/inscripciones/", 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)

            }
        )
        console.log(await response.json())


    } catch (error) {
        console.log(error)
    }

}


export default CargarExcel