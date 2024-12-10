import React, { useContext, useEffect, useRef } from "react"
import SearchBar from "../../Components/searchbar"

import "./home.css"
import { GeneralContext } from "../../Context/Context"
import Inscripciones from "./Inscripciones"

function Home() {
    const GContext = useContext(GeneralContext)

    useEffect(()=> {
        getMaterias(GContext.setMaterias)
    }, [])

    return <div className="MateriasContainer">
            <SearchBar ContentSetter={GContext.setMateriasFilter} Placeholder={"Buscar Materia..."}></SearchBar>
            {GContext.materias ? <Inscripciones/> : <div>Cargando materias...</div> }
        </div>
}


async function getMaterias(setMaterias) {
    try {
        const response = await fetch("/materias.json", {
            headers: {
                'Accept': 'application/json'
            }
        })
        setMaterias(await response.json())
    } catch (error) {
        console.log(error)
    }
}

// POR AHORA NADA PORQUE NO HAY API >:)

async function getMateriasAPI(setMaterias) {
    try {
        const response = await fetch("http://127.0.0.1:8000/inscripciones/", {
            headers: {
                'Accept': 'application/json'
            }
        })

        console.log(await response.json())
        setMaterias(await response.json())
    } catch (error) {
        console.log(error)
    }
}

export default Home