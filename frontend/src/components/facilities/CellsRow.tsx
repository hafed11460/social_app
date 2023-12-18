import { memo, useCallback, useState } from "react"
import { IFacilite, ITimeline } from "types/types.facilities"
import Cell from "./Cell"
import './facilities.css'


interface YearRowProps {
    year: number,
    date: Date,
    facilite: IFacilite
}


const CellsRow = memo(({ facilite, date, year }: YearRowProps) => {
    console.log('render CellsRow Componente')
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))


    const isExistMont = useCallback((month: number) => {
        const item: ITimeline | undefined = facilite.timelines.find((item: any) => item.month == month)
        if (!item) {
            const tLine: ITimeline = {
                facilite: facilite.id,
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
        <>

            <div className='d-flex'>
                <div className="cell-border border-start text-center cell flex-cell"><small>{facilite.employee.matricule}</small></div>
                <div className="cell-border text-center employee-cell flex-cell">
                    <small>{facilite.employee.nom.substring(0, 10)}
                        {facilite.employee.prenom.substring(0, 1)}</small>
                </div>
                <div className="cell-border text-center cell flex-cell"><small>{facilite.duree} Mois</small></div>
                <div className="cell-border text-center montant-cell flex-cell"><small>{facilite.montant}</small></div>
                <div className="cell-border text-center cell flex-cell"><small>{facilite.date_achat}</small></div>
                {
                    montCells && montCells.map((month, index) =>
                        <div className="cell-border fw-bold text-center cell flex-cell">
                            {isExistMont(month)}
                        </div>
                    )
                }
            </div>


        </>
    )
})

export default CellsRow