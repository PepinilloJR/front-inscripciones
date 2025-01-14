

function Alumno({alumno}) {
    return <div className="Alumno">
        <div className="AlumnoCampo"> Legajo: {alumno.legajo} </div>
        <div className="AlumnoCampo">Nombre: {alumno.nombre}</div>
        <div className="AlumnoCampo">Apellido: {alumno.apellido}</div>
        <div className="AlumnoCampo">Comision opcion 1: {alumno["Comision 1"]}</div>
        <div className="AlumnoCampo">Comision opcion 2: {alumno["Comision 2"]}</div>
    </div>
}


export default Alumno