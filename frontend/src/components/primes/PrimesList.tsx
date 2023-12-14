import { useGetPrimesMutation, useGetPrimetypesMutation } from 'features/primes/primesAPI';
import { DATE_DE_FETE, DATE_DE_RECEPTION, MONTANT, OBSERVATION, PRIME_TYPE } from 'headers/headers';
import React, { useEffect, useState } from 'react'
import { IPrime, IPrimetypes, months } from 'types/types.employees';
import EditPrime from './EditPrime';
import { Button, Col, Form, InputGroup, Navbar, Row } from 'react-bootstrap';
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs';
import axios from 'axios';
import { BASE_URL } from 'features/BASE_URL';


export const PrimesList = () => {
    const [show, setShow] = useState(false);
    const [pid, setPid] = useState<number>()
    const [getPrimes,{ data }] = useGetPrimesMutation({})
    const [getPrimetypes, { data: primetypes }] = useGetPrimetypesMutation()
    const [total, setTotal] = useState<number>(0)
    const [dateSelected,setDateSelected] = useState<string>('')

    const handleEdit = () => {

    }
    const handleDateSelected =(e:React.ChangeEvent<HTMLInputElement>)=>{
            setDateSelected(e.target.value)
    }
    const handleExportToExcel = async () => {
        await axios({
            url:`${BASE_URL}employees/primes/excel/?date=${dateSelected}`,
            method:'GET',
            responseType:'blob'
        })
            .then((res) => {
                const url = window.URL.createObjectURL(res.data);

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'primes.xlsx');
                document.body.appendChild(link);
                link.click();
            })
    }
    useEffect(() => {
        getPrimes(dateSelected)
    }, [dateSelected])

    useEffect(() => {
        getPrimetypes({})
    }, [])

    useEffect(() => {
        if (data) {

            let t = 0
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                console.log(element)
                t += Number(element.montant)
            }
            setTotal(t)
        }
    }, [data])
    const PrimeRows = (prime_t: IPrimetypes) => {
        if (!data) return
        const primes = data.filter((prime: IPrime) => prime.prime_type.id == prime_t.id)
        return (
            <>

                {
                    primes.map((prime: IPrime, index: number) => (
                        <tr key={prime.id}>
                            {/* {index == 0 ? <th rowSpan={primes.length}> {prime_t.name}</th> : ''} */}
                            <td>{prime.prime_type.name}</td>
                            <td>{prime.date_f}</td>
                            <td>{prime.date_r}</td>
                            <td>{prime.montant}</td>
                            <td>{prime.observation}</td>
                            <td><Button onClick={() => { setShow(!show); setPid(prime.id) }}>Edit</Button></td>
                        </tr>
                    ))
                }
            </>
        )
    }
    
    return (
        <div className="card px-2">
            <div className="card-header">
                <EditPrime pid={pid} show={show} setShow={setShow} />
                <Navbar className="bg-body-tertiary justify-content-between">
                    <Form >
                        <Form.Group>
                            <Form.Control onChange={handleDateSelected}  type='date'></Form.Control>
                        </Form.Group>                        
                    </Form>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className=" mr-sm-2"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button onClick={handleExportToExcel}><BsFileEarmarkSpreadsheet /></Button>
                            </Col>
                        </Row>
                </Navbar>
            </div>
            <div className="card-content">



                <div className="table-responsive">
                    <table className="table table-striped mb-0">
                        <thead>
                            <tr>
                                {/* <th>{PRIME_TYPE}</th> */}
                                <th>{PRIME_TYPE}</th>
                                <th>{DATE_DE_FETE}</th>
                                <th>{DATE_DE_RECEPTION}</th>
                                <th>{MONTANT}</th>
                                <th>{OBSERVATION}</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                primetypes && primetypes.map((prime_t: IPrimetypes) => (
                                    <>
                                        {PrimeRows(prime_t)}
                                    </>
                                ))
                            }
                            <tr>
                                <td colSpan={3}>Total</td>
                                <td >{total}</td>
                                {/* <td >Total</td>
                                <td >Total</td> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
