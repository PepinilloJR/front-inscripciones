import { useContext } from "react"
import { CurContext } from "../../Context/Context"

function CursadosSelectors() {

    const {setCursadosSelected, cursadosSelected, cursados, cursadosFiltrados} = useContext(CurContext)

    return <div className="Selectors">

    
    <label className='Checkbox'>
    <input onChange={(e) => {
        if(e.target.checked) {
            setCursadosSelected(cursados)
        } else {
            setCursadosSelected([])
        }
    }} type="checkbox"></input>
        Seleccionar todos
    </label>
    <div className="SelectedCount">
        {cursadosSelected?.length} / {cursadosFiltrados?.length}
    </div>
    
    </div>
}


export default CursadosSelectors