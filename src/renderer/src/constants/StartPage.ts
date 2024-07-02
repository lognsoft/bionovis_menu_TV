import type IStart from "@renderer/types/IStartPage";
import type ILanguage from "@renderer/types/ILanguage";

const PortugueseContent:IStart = {
    title: "BEM-VINDO!",
    message: "Estamos muito<br/>felizes por você<br/>fazer parte<br/>dessa experiência",
    interaction: "clique na mandala para começar",
    close:"Sair",
    config:"Config"
}

const EnglishContent:IStart = {
    title: "WELCOME!",
    message: "We are very<br/>happy that you<br/>are part of this<br/>experience",
    interaction: "click on the Mandala to start",
    close:"Exit",
    config:"Config"
}

const pageStartContent:ILanguage<IStart> = {
    default: PortugueseContent,
    english: EnglishContent
}

export default pageStartContent;