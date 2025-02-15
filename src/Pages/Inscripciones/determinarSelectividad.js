import { useContext } from "react";
import { InsContext } from "../../Context/Context";
import { useEffect, useState } from "react"

// esto podria mejorarse si uso directamente las materias y los cursos en ves de las versiones filtradas?
// esto podria permitirme acceder directamente por ID, o quizas no? tengo que ver


function DeterminarSelectividad(inscripciones,cursosMap,materia,cursoSelected) {

   // console.log("---------------")
   // console.log(inscripciones)
   // console.log(cursosMap)
   // console.log(materia)
   // console.log(curso)

    if (cursosMap) {
        var cursos = JSON.parse(JSON.stringify(cursosMap))
    } 
    //var cursos = {...cursosMap}
    //var curso = {...cursoSelected}
    if (cursoSelected) {
        var curso = JSON.parse(JSON.stringify(cursoSelected))
    }
    var seleccionados = []
    // si tenemos una materiaSeleccionada, debemos considerar solamente los cursos filtrados por esta materia
    if (materia || curso) {

        // si tenemos un curso seleccionado, solo debemos considerar los cupos para ese solo curso, mejor caso posible
        if (curso) {

            //console.log("tengo el curso seleccionado" + curso)
            inscripciones?.forEach(i => {
                if (i.comision1.codigo === curso.comision.codigo && ((curso.cupo - curso.inscriptos) - 1 >= 0)) {
                    curso.cupo = curso.cupo - 1
                    seleccionados.push({    
                        inscripcion: i,
                        curso:curso
                    })

                } else if (i.comision2.codigo === curso.comision.codigo && ((curso.cupo - curso.inscriptos) - 1 >= 0)) {
                    curso.cupo = curso.cupo - 1
                    seleccionados.push({    
                        inscripcion: i,
                        curso:curso
                    })
                }
            })

        } else {

            // esta parte no funciona? PORQUE
            inscripciones?.forEach(i => {


                if (cursos[i.comision1.codigo] && ((cursos[i.comision1.codigo].cupo - cursos[i.comision1.codigo].inscriptos - 1) >= 0)) {
                    cursos[i.comision1.codigo].cupo = cursos[i.comision1.codigo].cupo - 1
                    seleccionados.push({    
                        inscripcion: i,
                        curso:cursos[i.comision1.codigo]
                    })


                } else if (cursos[i.comision2.codigo] && ((cursos[i.comision2.codigo].cupo - cursos[i.comision2.codigo].inscriptos - 1) >= 0)) {
                    cursos[i.comision2.codigo].cupo = cursos[i.comision2.codigo].cupo - 1
                    seleccionados.push({    
                        inscripcion: i,
                        curso:cursos[i.comision2.codigo]
                    })

                }
            })
        }
    }

    return seleccionados

}

export default DeterminarSelectividad