import IModal, { IModalLanguage } from "@renderer/types/IModal";

const PortugueseModal:IModalLanguage = {
    text:"Deseja encerrar a aplicação?",
    button:"Não",
    confirmButton:"Sim"
}

const EnglishModal:IModalLanguage = {
    text:"Do you want to close the application?",
    button:"No",
    confirmButton:"Yes",
}

const Modal:IModal = {
    default:PortugueseModal,
    english:EnglishModal,
}

export default Modal;