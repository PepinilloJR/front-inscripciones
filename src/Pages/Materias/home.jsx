import React, { useContext, useEffect, useRef } from "react"
import SearchBar from "../../Components/searchbar"

import "./home.css"
import { GeneralContext } from "../../Context/Context"
import MateriasSlider from "./slider"

function Home() {
    const {setMateriasFilter} = useContext(GeneralContext)

    return <div className="MateriasContainer">
            <SearchBar ContentSetter={setMateriasFilter} Placeholder={"Buscar Materia..."}></SearchBar>
            <MateriasSlider/>
        </div>
}

export default Home