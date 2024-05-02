import { ReactNode } from "react";


interface BoostrapIconProps{
    size:number,
    children:ReactNode
}

const BoostrapIcon = ({ size=30,    children,}:BoostrapIconProps)=>{
    return(
        <>
            {children}
        </>
    )
}

export default BoostrapIcon;