import { useEffect, useRef } from "react";
import * as XLSX from 'xlsx';
import { FormatText } from "../Services/useful";
import { HiMiniDocumentPlus } from "react-icons/hi2";

import './uploadExcel.css'

function CargarExcelComponent({archivo, setArchivo, json, setJson, ListaErrores}) {

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
        <div className="JsonSection">
            <div className="ExcelJsonContainer">
                {JSON.stringify(json, null, 4)}
            </div>
            {ListaErrores?.length > 0 ? <div className="ExcelJsonContainerErrores">
                <div className="ExcelJsonContainerErroresTitulo">
                Los siguientes no pudieron subirse, revisar bien el excel y volver a intentar...
                </div>
                {ListaErrores.map((o, key) => {
                    // cuando se considera que habra posibles errores, de existir, se devolvera el listado con los errores
                    // y los objetos asociados a los errores, estos objetos tendran un id que los asocie a uno de los datos 
                    // del json de subida para poder visualizarlos
                    const objeto = o[Object.keys(o)[0]]
                    const errores = o[Object.keys(o)[1]]

                    const referencia = json.find(i => i.id === objeto.id)

                    return <div className="Errores"> 
                        <div className="ObjetosErrorContainer"> 
                            {Object.keys(referencia).map((dato, key) => {
                                return <div className="ErrorText" key={key}>{dato} : {referencia[dato]}</div>
                            })}    
                        </div>
                        <div className="ErroresContainer">
                            {errores.map((dato, key) => {
                                return <div className="ErrorTextReason" key={key}>{dato} : {referencia[dato]}</div>
                            })}    
                        </div>
                    </div>
                })}
            </div> : <></> }
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
            
            var currentId = 0
            
            // mapea las propiedades obtenidas del excel a algo mas legible y util al backend
            const JsonLimpio = Json.map(object => {
                const nuevoObjeto = { id: currentId}
                currentId = currentId + 1 
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