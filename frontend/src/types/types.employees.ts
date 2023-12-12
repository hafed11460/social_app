
export interface IDirection{
    id:number,
    name:string
}

export interface IEmployee {
    id:number,
    matricule: number,
    nom: string,
    prenom: string,
    date_n: string,
    date_e: string,
    poste: string,
    direction: IDirection,
    type_contrat: string,
    fin_contrat: string,
    created_at: string,    
}

export interface IPrime{
    id:number,
    employee:number,
    prime_type:IPrimetypes,
    date_f:string,
    date_r:string,
    montant:number,
    observation:string
}
export interface IPrimetypes{
    id:number,
    name:string
}