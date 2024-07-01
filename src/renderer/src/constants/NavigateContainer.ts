import INavigateContainer, { IMenuButtons } from "@renderer/types/INavigateContainer";


const portugueseMenu:IMenuButtons = {
    back:"Voltar",
    openMenu:"Menu",
    homeButton:"Início",
    closeMenu:"Ocultar",
}

const englishMenu:IMenuButtons = {
    back:"Back",
    openMenu:"Menu",
    homeButton:"Home",
    closeMenu:"Hide",
}


const NavigateContainer:INavigateContainer = {
    default: portugueseMenu,
    english:englishMenu,
}

export default NavigateContainer;