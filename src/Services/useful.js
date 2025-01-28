

// elimina variaciones en strings que podrian causar problemas, como mayusculas, puntos, comas, etc
// si los textos no son limpiados antes de enviarlos a un endpoint de services, seria correcto usar esta funcion en estos
// antes de enviarlos
export function FormatText(txt) {

    var FormatedText = txt;

    const regex = /[\:\.\,\_]/g // deteccion de , : . _
    const regexA = /[à-ç]/g  // deteccion de acentos y alternativas a las vocales similares
    const regexE = /[è-ë]/g 
    const regexI = /[ì-ï]/g 
    const regexO = /[ðò-÷]/g 
    const regexU = /[ù-ÿ]/g 

    const regexNumbers = /(?<=\s)([il|]+)(?=\s|$)/g // deteccion de alternativas para expresar un numero

    FormatedText = txt?.replace(regex, "").toLowerCase()

    FormatedText = FormatedText.replace(regexA, "a")
    FormatedText = FormatedText.replace(regexE, "e")
    FormatedText = FormatedText.replace(regexI, "i")
    FormatedText = FormatedText.replace(regexO, "o")
    FormatedText = FormatedText.replace(regexU, "u")

    const detecciones = [...FormatedText.matchAll(regexNumbers)]
    if (detecciones.length > 0) {
        FormatedText = FormatedText.replace(regexNumbers, detecciones[0][0].length.toString())
    }

    return FormatedText
}

// ejemplo

// string ingresado: 
// AáAÁñÑáéíóúÁÉÍÓÚ ii.

// string de salida:
// aaaaññaeiouaeiou 2

