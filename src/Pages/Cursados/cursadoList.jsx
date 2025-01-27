import { useContext } from "react"
import { CurContext } from "../../Context/Context"
import { Cursado } from "./cursado"

function CursadosList() {

    const {cursados} = useContext(CurContext)

    return <div className="CursadosListBox">
                <div className='CursadosList'>
                {cursados?.map((c, key) => {
    
                    return <Cursado cursado={c} key={key}></Cursado>
                })}
                </div>
            </div>
}

export default CursadosList