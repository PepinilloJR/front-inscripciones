

export const APIurl = "http://127.0.0.1:8000"


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
    } catch (e) {
        console.log(e)
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
    } catch (e) {
        console.log(e)
    }

}


export async function POSTalumno(legajo, nombre, apellido) {
    try {
        const response = fetch(`${APIurl}/alumnos/`, {
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
    } catch (e) {
        console.log(e)
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

    } catch (error) {
        console.log(error)
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



