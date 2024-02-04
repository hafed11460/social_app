import { Card, Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import EmployeeFacilities from './EmployeeFacilities';
import EmployeeInfo from './EmployeeInfo';
import EmployeePrimes from './EmployeePrimes';

const EmployeeDetail = () => {
    console.log('render Employee Detail')
    const { matricule } = useParams();


    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="facilities">
                <Nav variant="pills" className="mb-2">
                    <Nav.Item className='rounded-0'>
                        <Nav.Link className='rounded-0' eventKey="facilities">Facilities</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className='rounded-0' eventKey="primes">Primes</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Row>
                    <Col xs={{
                        span: 3,
                    }}>
                        <EmployeeInfo matricule={matricule} />
                    </Col>
                    <Col sm={9}>

                        <Card className='shadow-sm border border-primary rounded-0'>
                            <Card.Body>
                                <Tab.Content>
                                    <Tab.Pane eventKey="facilities">
                                        <EmployeeFacilities matricule={Number(matricule)} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="primes">
                                        <EmployeePrimes matricule={Number(matricule)} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default EmployeeDetail
