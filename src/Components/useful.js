


export function FormatText(txt) {

    var FormatedText = txt;

    const regex = /[\:\.]/g // detectar puntos . y :

    FormatedText = txt?.replace(regex, "").toLowerCase()

    console.log(FormatedText)

    return FormatedText
}