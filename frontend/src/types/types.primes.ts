import { IEmployee } from "./types.employees";


export interface IPFilterArgs{
    procesId:number,
    date?:number,
    query?:string,
    page?:number
}


export interface IPrime {
    id: number,
    employee: number,
    proces_v: number,
    prime_type: IPrimetypes,
    date_f: string,
    date_r: string,
    montant: number,
    observation: string
}
export interface IPrimetypes {
    id: number,
    name: string
}

export interface IProcesVerbal {
    id: number,
    name: string,
    observation?:string
    is_open:boolean
}


export interface FaciliteFilterData {
    matricule?: number,
    nom: string,
    prenom: string
}