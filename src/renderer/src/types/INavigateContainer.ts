export interface IMenuButtons{
    back:string;
    openMenu:string;
    homeButton?:string;
    closeMenu:string;
}

export default interface INavigateContainer{
    default:IMenuButtons;
    english:IMenuButtons;
}