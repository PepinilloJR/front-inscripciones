import { useContext } from "react"
import { InsContext } from "../../Context/Context"
import Inscripcion from "./inscripcion"


function InscripcionesList() {

    const {  inscripcionesFiltradas } = useContext(InsContext)

    return <>
    <div className="PrincipalSectionBox">
    <div className="GroupList">
        {inscripcionesFiltradas?.map((i, key)=> {
            
            return <Inscripcion key={key} inscripcion={i} ></Inscripcion>
       })}
       
    </div>
    </div>
    </>
}



export default InscripcionesList