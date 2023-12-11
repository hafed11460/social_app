
export interface IDirection{
    id:number,
    name:string
}

export interface IEmployee {
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