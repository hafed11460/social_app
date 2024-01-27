import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import EmployeeFacilities from './EmployeeFacilities';
import EmployeeInfo from './EmployeeInfo';
import EmployeePrimes from './EmployeePrimes';

const EmployeeDetail = () => {
    console.log('render Employee Detail')
    const { matricule } = useParams();

    
    return (
        <>
            <Row className=''>
                <Col xs={{
                    span:3,                    
                }}>
                    <EmployeeInfo matricule={matricule} />
                </Col>
                <Col>
                    <Tabs className='mb-3'>
                        <Tab eventKey="facilities" title="Facilities">
                            <EmployeeFacilities matricule={Number(matricule)} />
                        </Tab>
                        <Tab eventKey="primes" title="Primes">
                            <EmployeePrimes matricule={Number(matricule)} />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </>
    )
}

export default EmployeeDetail
