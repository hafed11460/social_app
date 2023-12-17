import { memo, useCallback, useState } from "react"
import { IFacilite, ITimeline } from "types/facilities"
import Cell from "./Cell"
import { Col, Row } from "react-bootstrap"

interface YearRowProps {
    date: Date,
    facilite: IFacilite
}

const CellsRow = memo(({ facilite, date }: YearRowProps) => {
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))


    const isExistMont = useCallback((month: number) => {
        const item:ITimeline | undefined = facilite.timelines.find((item: any) => item.month == month)
        if (!item)
            return <Cell montant={0} />
        return <Cell montant={item.somme} />


    }, [facilite])
    return (
        <Row className='border'>
            <Col md={{ span: 2 }}>{facilite.employee.nom} {facilite.employee.prenom}</Col>
            {
                montCells && montCells.map((month, index) =>
                    <Col className='border-start p-0' key={index}>
                        {/* {date.getFullYear()}  */}
                        {/* {index + 1} */}
                        {
                            isExistMont(month)}
                    </Col>
                )
            }
        </Row>
    )
})

export default CellsRow