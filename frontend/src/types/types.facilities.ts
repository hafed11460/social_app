import { IEmployee } from "./types.employees";

export interface ITimeline{
    facilite:number,
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
    solde?:number,
    date_achat:string,
    is_completed:boolean,
    timelines:ITimeline[], 
}