import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProcesVerbal, selectProcesVerbal } from 'features/primes/primesSlice';
import { useEffect, useState } from 'react';
import { Card, Tab, Tabs } from 'react-bootstrap';
import { IProcesVerbal } from 'types/types.primes';
import PrimesList from './PrimesList';



const PrimesApp = () => {

    const dispatch = useAppDispatch()
    const procesVerbal = useAppSelector(selectProcesVerbal)
    const [procesId, setProcesId] = useState(1)


    useEffect(() => {


        dispatch(getProcesVerbal())
            .then(() => {
                // setLoading(false)
            }).catch((err: any) => {
                // setLoading(false)
            })
    }, [])

    // if (!procesVerbal) return <div> No results</div>


    return (
        <Card>
            <Card.Header>
                {/* <HeaderNavbar /> */}
            </Card.Header>

            <Card.Body>
                <Tabs className='mb-3' onSelect={(key)=>setProcesId(key)}>
                    {
                        procesVerbal?.length && procesVerbal.map((proces: IProcesVerbal) => (
                            <Tab
                                eventKey={proces.id}
                                title={proces.name}
                                onClick={() => alert()}>
                            </Tab>
                        ))
                    }

                </Tabs>
                <PrimesList procesId={procesId} />
            </Card.Body>
        </Card>
    )
}

export default PrimesApp
