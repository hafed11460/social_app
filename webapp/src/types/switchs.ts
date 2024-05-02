export interface IEnvironment {
    id: number,
    name: string,
    temp: number,
    created_at: string,
    switch: number
}

export type ISwitch = {
    id: number,
    name: string,
    ip: string,
    temp: number,
    ip_address: string,
    environment: IEnvironment
}

export interface IPort {
    name: string,
    interface: string,
    switch_num: number,
    status: string,
    port_nbr: number,
    switch_id: number
}

export interface IPortSecurity{
    name: string,
    interface: string,
    switch_num: string,
    max: string,
    current_addr: string,
    security_violation: string,
    security_action: string,
    index: string
}


export interface ISwitchInfo {
    name: string,
    ip_address: string,
    category: string
}



export interface Device{
    code: string,
    serial: string,
    ip_address: string,
    type: string
}
export interface IMacAddresItem{
        vlan: number,
        mac_address: string,
        type: string,
        port: string
        device?:Device
}