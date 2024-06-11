export interface IStart{
    title:string;
    message:string;
    interaction:string;
    close:string
}

export default interface IStartPage{
    default:IStart;
    english:IStart
}