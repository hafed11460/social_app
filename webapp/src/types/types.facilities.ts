import { IEmployee } from "./types.employees";


export interface IFFilterArgs{
    date?:number,
    query?:string,
    page?:number
}
export interface ITimeline{
    facilite:number,
    id:number,
    month:number,
    mois:string,
    somme:number ,
    color?:string,
    observation:string,
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
    observation:string
}

export interface FaciliteFilterData {
    matricule?: number,
    nom: string,
    prenom: string
}