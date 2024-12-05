import React, { useContext, useEffect } from "react"
import SearchBar from "../../Components/searchbar"

import "./home.css"
import { GeneralContext } from "../../Context/Context"
import Inscripciones from "./Inscripciones"

function Home() {
    const GContext = useContext(GeneralContext)
    
    useEffect(()=> {
        getInscripciones(GContext.setInscripciones)
    }, [])

    console.log(GContext.inscripciones)

    return <div className="InscripcionesContainer">
            <SearchBar></SearchBar>
            {GContext.inscripciones ?  <Inscripciones/> : <div></div> }
        </div>
}


async function getInscripciones(setInscripciones) {
    try {
        const response = await fetch("/inscripciones.json", {
            headers: {
                'Accept': 'application/json'
            }
        })
        setInscripciones(await response.json())
    } catch (error) {
        console.log(error)
    }
}


async function getInscripcionesAPI(setInscripciones) {
    try {
        const response = await fetch("http://127.0.0.1:8000/inscripciones/", {
            headers: {
                'Accept': 'application/json'
            }
        })

        console.log(await response.json())
        setInscripciones(await response.json())
    } catch (error) {
        console.log(error)
    }
}

export default Home