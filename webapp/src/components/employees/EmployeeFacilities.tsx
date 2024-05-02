import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getEmployeeFacilities, selectemployeeFacilities } from 'features/facilities/facilitiesSlice'
import { DATE_ACHAT, DATE_DE_FETE, DUREE, MONTANT_ACHAT, OBSERVATION, SOLDE, SOMME, STATE } from 'headers/headers'
import { memo, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import { IFacilite, ITimeline } from 'types/types.facilities'


interface EmployeeFacilitiesProps {
    matricule: number
}
interface FaciliteItemProps {
    facilite: IFacilite
}

const FaciliteItem = ({ facilite }: FaciliteItemProps) => {
    return (
        <div className="table-responsive p-2">
            <table className="table table-bordered  mb-5">
                <thead>
                    <tr>
                        <th style={{ minWidth: '80px' }}>{DATE_ACHAT}</th>
                        <th>{DUREE}</th>
                        <th>{MONTANT_ACHAT}</th>
                        <th>{SOLDE}</th>
                        <th>{OBSERVATION}</th>
                        <th>{STATE}</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ minWidth: '100px' }}>{facilite.date_achat}</td>
                        <td>{facilite.duree}</td>
                        <td>{facilite.montant}</td>
                        <td>{facilite.solde}</td>
                        <td>{facilite.observation}</td>
                        <td>{facilite.is_completed}</td>
                        <td>
                            <a href="#">
                                <i className="badge-circle badge-circle-light-secondary font-medium-1"
                                data-feather="mail"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="table table-bordered  mb-0">
                <thead>
                    <tr>
                        <th style={{ minWidth: '100px !important' }}>{SOMME}</th>
                        <th style={{ minWidth: '100px !important' }}>{DATE_DE_FETE}</th>
                        <th style={{ minWidth: '100px' }}>{STATE}</th>
                        <th style={{ minWidth: '100px' }}>{OBSERVATION}</th>
                        <th style={{ minWidth: '100px' }}>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        facilite.timelines && facilite.timelines.map((timeline: ITimeline) =>
                            <tr key={timeline.id}>
                                <td>{timeline.somme}</td>
                                <td>{timeline.mois}</td>
                                <td>{timeline.is_commited}</td>
                                <td>{timeline.observation}</td>
                                <td><a href="#"><i
                                    className="badge-circle badge-circle-light-secondary font-medium-1"
                                    data-feather="mail"></i></a></td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}


const EmployeeFacilities = memo(({ matricule }: EmployeeFacilitiesProps) => {
    console.log('render Employee Facilite')
    // const [isLoding, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const employeeFacilities = useAppSelector(selectemployeeFacilities)
    useEffect(() => {
        if (matricule)
            dispatch(getEmployeeFacilities(
                matricule
            )).then(() => {
                // setLoading(false)
            }).catch((err) => {
                // setLoading(false)
            })
    }, [matricule])

    if (!employeeFacilities?.results) return <div> No results</div>

    return (
        <>
            <Accordion defaultActiveKey="0">
                {
                    employeeFacilities.results && employeeFacilities.results.map((facilite: IFacilite) =>
                        <Accordion.Item eventKey={`acc${facilite.id}`} className='mb-3'>
                            <Accordion.Header>{facilite.date_achat}</Accordion.Header>
                            <Accordion.Body>
                                <FaciliteItem key={facilite.id} facilite={facilite} />
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                }
            </Accordion>
        </>
    )
})

export default EmployeeFacilities
