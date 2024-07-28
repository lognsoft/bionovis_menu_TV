import ISubRoute from "@renderer/types/ISubRoute";

export default interface IRoute{
    path?:string | {name:string, params:{[key:string]:string}};
    subPathName?:string;
    subText?:string
    pathname:string;
    color:string;
    subRoutes?:ReadonlyArray<ISubRoute>
    video:string;
}

export interface IRoutes {
    name:string;
    image:string;
    color:string;
    timer:number;
    routes?:ReadonlyArray<IRoute>;
    video:string;
}