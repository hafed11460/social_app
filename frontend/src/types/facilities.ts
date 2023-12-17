import { IEmployee } from "./types.employees";

export interface ITimeline{
    id:number,
    month:number,
    mois:string,
    somme:number ,
    is_commited:boolean
}

export interface IFacilite{
    id:number,
    employee:IEmployee,
    duree:string,
    montant:number,
    date_achat:string,
    is_completed:boolean,
    timelines:ITimeline[], 
}