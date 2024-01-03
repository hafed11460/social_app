import { useUpdateTimelineMutation } from "features/facilities/facilitiesAPI";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { IFacilite, ITimeline } from "types/types.facilities";
import Cell from "./Cell";
import UpdateCell from "./UpdateCell";
import NewCell from "./NewCell";

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

const NewCell___ = ({ facilite, month,year }: NewCellProps) => {
    const cell = {
        facilite: facilite.id,
        month: month,
        mois: `${year}-${month}-01`,
        somme: 0,
        is_commited: false
    }
    return (

        <UpdateCell timeline={cell} isExist={true} isFacCompleted={false} />
    )

}




const Cells = ({ facilite, month, year }: EditCellProps) => {

    let item: ITimeline | undefined = facilite.timelines.find((item: ITimeline) => item.month == month)

    if (item === undefined)

        return <NewCell timeline = {{
            facilite: facilite.id,
            month: month,
            mois: `${year}-${month}-01`,
            somme: 0,
            is_commited: false
        }} month={month} year={year} />

    return <UpdateCell timeline={item} isExist={true} isFacCompleted={false} />

}

export default Cells