

// elimina variaciones en strings que podrian causar problemas, como mayusculas, puntos, comas, etc
export function FormatText(txt) {

    var FormatedText = txt;

    const regex = /[\:\.\,\_]/g // detectar puntos . y :
    // detectar acentos y otras modificaciones a las letras

    const regexA = /[à-ç]/g 
    const regexE = /[è-ë]/g 
    const regexI = /[ì-ï]/g 
    const regexO = /[ðò-÷]/g 
    const regexU = /[ù-ÿ]/g 

    FormatedText = txt?.replace(regex, "").toLowerCase()

    FormatedText = FormatedText.replace(regexA, "a")
    FormatedText = FormatedText.replace(regexE, "e")
    FormatedText = FormatedText.replace(regexI, "i")
    FormatedText = FormatedText.replace(regexO, "o")
    FormatedText = FormatedText.replace(regexU, "u")

    console.log(FormatedText)

    return FormatedText
}



// AáAÁñÑáéíóúÁÉÍÓÚ.
// aaaaññaeiouaeiou