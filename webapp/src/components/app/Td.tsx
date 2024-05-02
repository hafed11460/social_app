import { IFacilite, ITimeline } from "types/types.facilities"
import UpdateTd from "./UpdateTd"
import NewTd from "./NewTd"
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

interface TextTdProps {
    value?: string | number,
    style?: CSSProperties | undefined;
    url?: string,
    classname?:string
}
export const TextTd = ({ value, style, url, classname }: TextTdProps) => {
    if (url) {
        return (
            <td style={style}>
                <Link to={url}>{value}</Link>
            </td>

        )
    }
    else {
        return (
            <td className={classname} style={style}>{value}</td>
        )
    }
}

interface CellTdProps {
    timeline: ITimeline,
}

interface UpdateCellProps {
    timeline: ITimeline,
    isExist: boolean,
    isFacCompleted: boolean,
}





interface TimelineProps {
    facilite: IFacilite,
    month: number,
}
const Timeline = ({ facilite, month }: TimelineProps) => {
    let item: ITimeline | undefined = facilite.timelines.find((item: ITimeline) => item.month == month)

    if (item === undefined) {
        return <NewTd timeline={{
            id: 0,
            facilite: facilite.id,
            month: month,
            mois: `${2024}-${month}-01`,
            somme: 0,
            is_commited: false,
            observation: ""
        }} isFacCompleted={facilite.is_completed} />
    }

    return <UpdateTd timeline={item} isExist={true} isFacCompleted={facilite.is_completed} />

}

export default Timeline