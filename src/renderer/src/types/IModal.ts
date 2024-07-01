export interface IModalLanguage {
    text:string;
    button:string;
    confirmButton:string;
}

export default interface IModal{
    default:IModalLanguage;
    english:IModalLanguage;
}