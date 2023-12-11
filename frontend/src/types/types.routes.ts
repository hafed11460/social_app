export type ChildRoute = {
    name:string,
    to: string,
    icon?:string,
    exact: boolean,
    active: boolean
}

export type DashRoute = {
    label:string,
    to:string,
    labelDisable:boolean,
    icon:string,
    children:ChildRoute[]
}