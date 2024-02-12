import { ReactNode } from "react"

interface TdNodeProps{
    children:ReactNode
}

function TdNode ({children}:TdNodeProps){
    return(
        <td>
            {children}
        </td>
    )
}

export default TdNode