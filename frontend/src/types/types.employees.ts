
export interface IDirection {
    id: number,
    name: string
}

export interface IEmployee {
    id: number,
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


export const months = {
    1:'janvier',
    2:'février',
    3:'mars',
    4:'avril',
    5:'mai',
    6:'juin',
    7:'juillet',
    8:'août',
    9:'septembre',
    10:'octobre',
    11:'novembre',
    12:'décembre',
}