import { FormatText } from "../Components/useful"


export async function POSTmateria(nombre_materia) {
    const nombre = FormatText(nombre_materia)
    try {
        const response = await fetch("http://127.0.0.1:8000/materias/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }, body: JSON.stringify({
                "nombre": nombre
            })
                
        })
        console.log(response)

    } catch (e) {
        console.log(e)
    }

}


export async function POSTcurso(Comision, Cuatrimestre, HoraInicio, HoraFin, Cupo, Materia) {
    const com = FormatText(Comision)
    const hin = FormatText(HoraInicio)
    const hfi = FormatText(HoraFin)

    try {
        const response = fetch("http://127.0.0.1:8000/cursos/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comision: com,
                cuatrimestre: Cuatrimestre,
                hora_inicio: hin,
                hora_fin: hfi,
                cupo: Cupo,
                materia: Materia
            })
        })
    } catch (e) {
        console.log(e)
    }

}


export async function POSTalumno(legajo, nombre, apellido) {
    const leg = FormatText(legajo)
    const nom = FormatText(nombre)
    const ape = FormatText(apellido)

    try {
        const response = fetch("http://127.0.0.1:8000/alumnos/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                legajo: leg,
                nombre: nom,
                apellido: ape
            })
        })
    } catch (e) {
        console.log(e)
    }

}


export async function POSTInscripcion(json) {
    try {
        const response = await fetch("http://127.0.0.1:8000/inscripciones/bulk", 
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
        console.log(await response.json())
    } catch (error) {
        console.log(error)
    }

}