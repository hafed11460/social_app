import { IFacilite, ITimeline } from "types/types.facilities";
import NewCell from "./NewCell";
import UpdateCell from "./UpdateCell";

interface EditCellProps {
    facilite: IFacilite,
    month: number,
    year: number

}
interface NewCellProps {
    facilite: IFacilite,
    month: number,
    year: number,
}






const Cells = ({ facilite, month, year }: EditCellProps) => {
    let item: ITimeline | undefined = facilite.timelines.find((item: ITimeline) => item.month == month)

    if (item === undefined){
        return <NewCell timeline={{
            id: 0,
            facilite: facilite.id,
            month: month,
            mois: `${year}-${month}-01`,
            somme: 0,
            is_commited: false,
            observation: ""
        }} month={month} year={year} isFacCompleted={facilite.is_completed} />
    }
        
    return <UpdateCell timeline={item} isExist={true} isFacCompleted={facilite.is_completed} />

}

export default Cells