import MDropdown from "components/common/MDropdown"
import UpdateFacilite from "components/facilities/UpdateFacilite"
import { useState } from "react"
import { Dropdown } from "react-bootstrap"
import { BsPencilSquare, BsThreeDots, BsTrash } from "react-icons/bs"
import { IFacilite } from "types/types.facilities"
import { iconSize_sm } from "value"
import Timeline, { TextTd } from "./Td"
import TdNode from "./TdNode"

interface TrProps {
    facilite: IFacilite
}

const TableRow = ({ facilite }: TrProps) => {
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    const [show, setShow] = useState(false);
    const handleEditFacilite = () => {
        setShow(!show)
    }
    return (
        <tr>
            <TextTd value={facilite.employee.matricule} url={`/employees/${facilite.employee.matricule}`}/>
            {/* <TextTd value={facilite.employee.nom +' ' +facilite.employee.prenom}  url={`/employees/${facilite.employee.matricule}`}/> */}
            <TextTd value={facilite.duree + ' Mois'} />
            <TextTd value={facilite.date_achat} />
            {/* <TextTd value={facilite.montant} style={{color:'white',backgroundColor:'green'}} /> */}
            <TextTd value={facilite.montant} style={{backgroundColor: "#d2ffe8",  color:"#00391"}} />
            <TextTd value={facilite.solde?.toFixed(2)}  style={ facilite.montant > facilite.solde  ? {backgroundColor: "#fffdd8",color: "#3f3c00"}:{}}/>

            {
                montCells && montCells.map((month, index) =>
                    <Timeline facilite={facilite} month={month} />
                )
            }
            <TdNode>
                <small className={`badge ${facilite.is_completed ? 'bg-light-success' : 'bg-light-primary'}`}>{facilite.is_completed ? 'Closed' : 'open'}</small>
            </TdNode>
            <TdNode>
                <>                    
                    <MDropdown className=" p-0" icon={<BsThreeDots />}>
                        <Dropdown.Item onClick={handleEditFacilite}>
                            <BsPencilSquare size={iconSize_sm} /> <span className="ms-2">Edit</span>
                        </Dropdown.Item>
                        <Dropdown.Item >
                            <BsTrash size={iconSize_sm} /> <span className="ms-2">Delete</span>
                        </Dropdown.Item>
                    </MDropdown>
                    <UpdateFacilite facilite={facilite} show={show} setShow={setShow} />
                </>
            </TdNode>

        </tr>
    )
}
export default TableRow