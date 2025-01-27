import { useContext } from "react"
import { CurContext } from "../../Context/Context"

function CursadosSelectors() {

    const {setCursadosSelected, cursados} = useContext(CurContext)

    return <div className="SelectorsContainer">
    <label className='Selector'>
    <input onChange={(e) => {
        if(e.target.checked) {
            setCursadosSelected(cursados)
        } else {
            setCursadosSelected([])
        }
    }} type="checkbox"></input>
        Seleccionar todos
    </label>
    </div>
}


export default CursadosSelectors