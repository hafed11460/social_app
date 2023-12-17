import { memo, useCallback, useState } from "react"
import { IFacilite, ITimeline } from "types/types.facilities"
import Cell from "./Cell"
import { Col, Row } from "react-bootstrap"

interface YearRowProps {
    year:number,
    date: Date,
    facilite: IFacilite
}

const CellsRow = memo(({ facilite, date ,year}: YearRowProps) => {
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))

    
    const isExistMont = useCallback((month: number) => {
        const item: ITimeline | undefined = facilite.timelines.find((item: any) => item.month == month)
        if (!item){
            const tLine: ITimeline = {  
                facilite:facilite.id,     
                month: month,
                mois: `${year}-${month}-01`,
                somme: 0,
                is_commited: false
            }
            return <Cell timeline={tLine} />
        }
        
        return <Cell timeline={item} />


    }, [facilite])
    return (
        <Row className='border p-0'>
            <Col md={{ span: 1 }}>{facilite.employee.matricule}</Col>
            <Col md={{ span: 2 }}>{facilite.employee.nom.substring(0,10)} {facilite.employee.prenom.substring(0,1)}</Col>
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