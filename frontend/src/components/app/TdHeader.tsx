interface TheadProps {
    label: string,
    width?:number
}
const TdHeader = ({ label,width }: TheadProps) => {
    return (
        <th className="text-center" style={{width:`${width}px`}}>{label}</th>
    )
}

export default TdHeader