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
    // console.log('render CellsRow Componente')
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))


    const isExistMont = useCallback((month: number) => {
        let item: ITimeline | undefined = facilite.timelines.find((item: any) => item.month == month)
        let isExist = true
        if (!item) {
            item = {
                facilite: facilite.id,
                month: month,
                mois: `${year}-${month}-01`,
                somme: 0,
                is_commited: false
            }
            isExist = false
            // return <Cell  timeline={tLine} isExist={false} />
        }

        return <Cell isFacCompleted={facilite.is_completed} timeline={item} isExist={isExist} />


    }, [facilite])
    return (
        <>

            <div className='d-flex'>
                <div className="cell-border text-center montant-cell flex-cell"><small>{facilite.montant}</small></div>
                <div className="cell-border text-center montant-cell flex-cell"><small>{facilite.solde}</small></div>

                {
                    montCells && montCells.map((month, index) =>
                        <div key={index} className="cell-border fw-bold text-center cell flex-cell">
                            {isExistMont(month)}
                        </div>
                    )
                }
                <div
                    className="cell-border  text-center cell flex-cell"
                    style={{ borderLeft: '1px solid #e6e6e6' }}
                >
                    <small>{facilite.employee.matricule}</small>
                </div>
                <div className="cell-border text-center employee-cell flex-cell">
                    <small>{facilite.employee.nom.substring(0, 15)} {facilite.employee.prenom.substring(0, 10)}</small>
                </div>
                <div className="cell-border text-center cell flex-cell"><small>{facilite.duree} Mois</small></div>
                <div className="cell-border text-center cell flex-cell"><small>{facilite.date_achat}</small></div>

                <div className={`cell-border text-center cell flex-cell ${facilite.is_completed ? 'btn btn-success btn-sm' : ''}`} ><small className="">comleted</small></div>
            </div>


        </>
    )
})

export default CellsRow