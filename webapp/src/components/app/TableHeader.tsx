import { ACTION, DATE_ACHAT, DUREE, EMPLOYEE, MATRICULE, MONTANT_ACHAT, SOLDE, STATE } from 'headers/headers'
import { months } from 'types/types.employees'
import TdHeader from './TdHeader'
import './app.css'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <TdHeader label={MATRICULE} width={50} />
                {/* <TdHeader label={EMPLOYEE} width={120}/> */}
                <TdHeader label={DUREE} />
                <TdHeader label={DATE_ACHAT} />
                <TdHeader label={MONTANT_ACHAT} width={50} />
                <TdHeader label={SOLDE} />
                {
                    Object.entries(months).map(([key, value]) => {
                        return (
                            <TdHeader key={key} label={value} />
                        )
                    })
                }
                <TdHeader label={STATE} width={50} />
                <TdHeader label={ACTION} width={50} />
            </tr>
        </thead>
    )
}

export default TableHeader
