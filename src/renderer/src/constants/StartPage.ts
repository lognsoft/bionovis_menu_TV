import IStartPage,{ IStart } from "@renderer/types/IStartPage";

const PortugueseContent:IStart = {
    title: "BEM-VINDO!",
    message: "Estamos muito<br/>felizes por você<br/>estar fazendo<br/>parte dessa<br/>experiência",
    interaction: "clique na mandala para começar",
    close:"Sair",
}

const EnglishContent:IStart = {
    title: "WELCOME!",
    message: "We are very<br/>happy that you<br/>are part of this<br/>experience",
    interaction: "click on the Mandala to start",
    close:"Exit",
}

const pageStartContent:IStartPage = {
    default: PortugueseContent,
    english: EnglishContent
}

export default pageStartContent;