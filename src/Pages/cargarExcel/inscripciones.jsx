
import "./inscripciones.css"
import { useEffect, useRef, useState } from "react"
import * as XLSX from 'xlsx';
import { ListadoContext } from "../../Context/Context";
import ListadoCupos from "./listaCupos";

function Inscripciones() {

    const [archivo, setArchivo] = useState()
    const [listaCupos, setListaCupos] = useState()
    const [listaIns, setListaIns] = useState()
    const inputArchivo = useRef()

    const CargarCupos = async () => {
        const json = await parseToJsonURL("./excelUnificado.xlsx", "cupos")
        setListaCupos(json)
    }

    const CargarIns = async () => {
        const json = await parseToJsonFile(archivo, "sistemas")
        setListaIns(json)

    }

    useEffect(() => {
        CargarCupos()
    }, [])

    useEffect(() => {
        if (archivo) {
            // archivo del input ya es un tipo blob, asi que esto anda joya
            CargarIns()
        }
    }, [archivo])

    return <>

        <label htmlFor="subir" className="LectorArchivo">
            Subir archivo Excel de inscripciones
        </label>
        <input ref={inputArchivo} type="file" onChange={() => {
            setArchivo(inputArchivo.current.files[0])
        }} id="subir"></input>

        <ListadoContext.Provider value={{ listaCupos, listaIns }}>
            <ListadoCupos></ListadoCupos>
        </ListadoContext.Provider>

    </>


}


function parseToJsonFile(archivo, sheet) {

    return new Promise(async (resolve, reject) => {

        const fileReader = new FileReader()

        fileReader.onload = (evento) => {

            var datos = evento.target.result
            var sheets = XLSX.read(datos, { type: "array" })

            var Json = XLSX.utils.sheet_to_json(sheets.Sheets[sheet])
            resolve(Json)
        }
        fileReader.readAsArrayBuffer(archivo)
    })

}

// temporalmente para cargar el otro excel para conseguir 
function parseToJsonURL(url, sheet) {
    return new Promise(async (resolve, reject) => {


        const data = await fetch(url)
        const blob = await data.blob()

        const fileReader = new FileReader()

        fileReader.onload = (evento) => {

            var datos = evento.target.result
            var sheets = XLSX.read(datos, { type: "array" })

            var Json = XLSX.utils.sheet_to_json(sheets.Sheets[sheet])
            resolve(Json)
        }
        fileReader.readAsArrayBuffer(blob)
    })
}

export default Inscripciones