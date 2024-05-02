import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProcesVerbal, selectProcesVerbal, setCurrentProcesV } from 'features/primes/primesSlice';
import { useEffect, useState } from 'react';
import { Card, Nav } from 'react-bootstrap';
import { IProcesVerbal } from 'types/types.primes';
import CreateProcesVerbal from './CreateProces';
import PrimeNavbar from './PrimeNavbar';
import PrimesList from './PrimesList';



const PrimesApp = () => {
    const dispatch = useAppDispatch()
    const procesVerbal = useAppSelector(selectProcesVerbal)

    const handleSelectProcesVerbal = (proces: IProcesVerbal) => {
        dispatch(setCurrentProcesV({ proces_v: proces }))
    }

useEffect(() => {
    dispatch(getProcesVerbal())
        .then(() => {
            // setLoading(false)
        }).catch((err: any) => {
            // setLoading(false)
        })
}, [])

useEffect(() => {
    if (procesVerbal.length)
        dispatch(setCurrentProcesV({ proces_v: procesVerbal[0] }))
}, [procesVerbal])



// if (!procesVerbal) return <div> No results</div>

return (
    <>
        <div className='d-flex align-items-start'>
            <Nav variant="pills" defaultActiveKey="1">
                {
                    procesVerbal?.length && procesVerbal.map((proces: IProcesVerbal) => (
                        <Nav.Item onClick={()=>handleSelectProcesVerbal(proces) } className='rounded-0'>
                            <Nav.Link className='rounded-0' eventKey={proces.id}>{proces.name}</Nav.Link>
                        </Nav.Item>
                    ))
                }
                {/* <Nav.Item>
                        {procesId}
                    </Nav.Item> */}
                <CreateProcesVerbal />
            </Nav>
        </div>
        <Card className='shadow-sm border border-primary rounded-0'>
            <Card.Body>
                {procesVerbal &&
                    <>
                        <PrimeNavbar />
                        <PrimesList />
                    </>
                }
            </Card.Body>
        </Card>
    </>
)
}

export default PrimesApp
