

export const APIurl = "http://127.0.0.1:8000"


export async function GETmaterias() {
    try {
        const response = await fetch(`${APIurl}/materias/`, {
            headers: {
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        return json
    } catch (error) {
        console.log(error)
    }
}


export async function POSTmateria(nombre_materia) {
    
    try {
        const response = await fetch(`${APIurl}/materias/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }, body: JSON.stringify({
                nombre: nombre_materia
            })
                
        })
        if (!response.ok) {
            return { message: "no se pudo subir la materia" + " Status: " + response.status, status: "error" }
        } 
        return { message: "Materia subida con exito", status: "ok"  }
    } catch (error) {
        return error
    }

}


export async function POSTcurso(Comision, Cuatrimestre, HoraInicio, HoraFin, Cupo, Materia) {

    try {
        const response = fetch(`${APIurl}/cursos/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comision: Comision,
                cuatrimestre: Cuatrimestre,
                hora_inicio: HoraInicio,
                hora_fin: HoraFin,
                cupo: Cupo,
                materia: Materia
            })
        })
        if (!response.ok) {
            return { message: "no se pudo cargar el curso" + " Status: " + response.status, status: "error" }
            
        } 
        return { message: "Curso subido con exito", status: "ok" }
    } catch (error) {
        return error
    }

}

export async function POSTcursos(json) {
    try {
        const response = await fetch(`${APIurl}/cursos/bulk`, 
        {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    json
                )
            }
        )
        if (!response.ok) {
            return { message: "no se pudo cargar los cursos" + " Status: " + response.status, status: "error" }
        } 
        return { message: "Cursos cargados con exito" }
    } catch (error) {
        return error
    }

}


export async function POSTalumno(legajo, nombre, apellido) {
    try {
        const response = await fetch(`${APIurl}/alumnos/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                legajo: legajo,
                nombre: nombre,
                apellido: apellido
            })
        })
        if (!response.ok) {
            return { message: "no se pudo subir el alumno" + " Status: " + response.status, status: "error" }
        } 
        return { message: "Alumno subido con exito", status: "ok"  }
        
    } catch (error) {
        return error
    }

}


export async function POSTInscripcion(json) {
    try {
        const response = await fetch(`${APIurl}/inscripciones/bulk`, 
        {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    json
                )
            }
        )
        if (!response.ok) {
            return { message: "no se pudo cargar las inscripciones" + " Status: " + response.status, status: "error" }
        } 
        return { message: "Inscripciones subidas con exito", status: "ok"  }
    } catch (error) {
        return error
    }

}

export async function GETcursosByMateria(idmateria) {
    try {
        const response = await fetch(`${APIurl}/materias/${idmateria}/cursos/`, {
            headers: {
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        return json.cursos
    } catch (error) {
        console.log(error)
    }

}

export async function GETinscripcionesByMateria(idmateria) {
    try {
        const response = await fetch(`${APIurl}/inscripciones/materia/${idmateria}`, {
            headers: {
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        return json.alumnos
       
    } catch (error) {
        console.log(error)
    }
    
}


export async function POSTcursados(cursoSelected, alumnosSelected, materiaSelected) {
    const cursados = []

    alumnosSelected.forEach((a) => {
        cursados.push(
            {
                estado: "inscripto",
                nombre: a.nombre,
                apellido: a.apellido,
                legajo: a.legajo,
                materia: materiaSelected.nombre,
                comision: cursoSelected.comision,
                cuatrimestre: cursoSelected.cuatrimestre,
                hora_fin: cursoSelected.hora_fin,
                hora_inicio: cursoSelected.hora_inicio,
                inscriptos: cursoSelected.inscriptos,
                cupo: cursoSelected.cupo
            }
        )
    })

    try {
        const response = await fetch(`${APIurl}/cursados/bulk`, 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    cursados
                )
            }
        )
        if (!response.ok) {
            return { message: "no se pudo subir los cursados" + " Status: " + response.status, status: "error" }
        } 
        return { message: "Cursados subidos con exito", status: "ok" }
    } catch (error) {
        return error
    }
}



