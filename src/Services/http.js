import { GiConsoleController } from "react-icons/gi"


export const APIurl = "http://localhost:8080" //"http://127.0.0.1:8000"


export async function GETmaterias() {
    try {
        const response = await fetch(`${APIurl}/materia`, {
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
        const response = await fetch(`${APIurl}/materia`, {
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
        return { message: "Materia subida con exito", status: "ok" }
    } catch (error) {
        return error
    }

}


export async function POSTcurso(json) {

    try {
        const response = fetch(`${APIurl}/curso`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                json
            })
        })
        if (!response.ok) {
            return { message: "no se pudo cargar el curso" + " Status: " + response.status, status: "error" }

        }
        return { message: "Curso subido con exito", status: "ok" }
    } catch (error) {
        return { message: "no se pudo cargar los cursos" + "razon: " + error, status: "error" }
    }

}

export async function POSTcursos(json) {
    try {
        const response = await fetch(`${APIurl}/curso`,
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
        
        return { message: "Cursos subidos con exito", status: "ok" }
    } catch (error) {
        return { message: "no se pudo cargar los cursos" + "razon: " + error, status: "error" }
    }

}


export async function POSTalumno(legajo, nombre, apellido) {
    try {
        const response = await fetch(`${APIurl}/alumno`, {
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
        return { message: "Alumno subido con exito", status: "ok" }

    } catch (error) {
        return error
    }

}


export async function POSTInscripcion(json) {
    try {
        const response = await fetch(`${APIurl}/solicitudInscripcionTardia`,
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
            return { message: "no se pudo cargar las inscripciones" + " Status: " + response.status, status: "error", body: await response.json() }
        }
        return { message: "Inscripciones subidas con exito", status: "ok", body: await response.json() }
    } catch (error) {
        return error
    }

}

export async function GETcursos(materia) {

    try {
        if (materia) {
            const response = await fetch(`${APIurl}/curso/materia/${materia.id}`, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            const json = await response.json()
            return json
        } else {
            const response = await fetch(`${APIurl}/curso`, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            const json = await response.json()
            return json

        }
    } catch (error) {
        console.log(error)
    }
}


export async function GETinscripciones(materia) {

    try {
        if (materia) {  // /materia/{materiaId}/visible
            const response = await fetch(`${APIurl}/solicitudInscripcionTardia/materia/${materia.id}/visible`, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            const json = await response.json()
            return json

        } else {
            const response = await fetch(`${APIurl}/solicitudInscripcionTardia/visible`, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            const json = await response.json()
            return json
        }
    } catch (e) {
        console.log(e)
    }
}

export async function GETcursados() {
    try {
        const response = await fetch(`${APIurl}/inscripcionTardia`, {
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


export async function POSTtardias(inscripcionesTardia) {
    console.log("hola")
    const tardias = []

    inscripcionesTardia.forEach((i) => {
        tardias.push({
            solicitudInscripcionTardia: i.inscripcion,
            alumno: i.inscripcion.alumno,
            curso: i.curso,
            estado: i.inscripcion.condicion,
            año: i.inscripcion.año
        })
    })  

    console.log(tardias)

    try {
        const response = await fetch(`${APIurl}/inscripcionTardia`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                tardias
            )
        })

        console.log(await response.json())
    } catch (error) {
        console.log(error)
    }

    return tardias

}