import { useAppDispatch, useAppSelector } from "app/hooks"
import MDropdown from "components/common/MDropdown"
import {
    selectFIsModalDel,
    selectFIsModalEdit,
    setCurrentEditFacilite,
    setDelFaciliteId,
    setFIsModalDel,
    setFIsModalEdit
} from "features/facilities/facilitiesSlice"
import { useMemo, useState } from "react"
import { Dropdown } from "react-bootstrap"
import { BsPencilSquare, BsThreeDots, BsTrash } from "react-icons/bs"
import { IFacilite } from "types/types.facilities"
import { iconSize_sm } from "value"
import Timeline, { TextTd } from "./Td"
import TdNode from "./TdNode"

interface TrProps {
    facilite: IFacilite,
    key?:string | number
}

const TableRow = ({ facilite }: TrProps) => {
    const dispatch = useAppDispatch()
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    const isModalDel = useAppSelector(selectFIsModalDel)
    const isModalEdit = useAppSelector(selectFIsModalEdit)

    const soldeStyle = useMemo(()=>{
        if (facilite.solde){
            if (facilite.montant > facilite.solde )
            return {backgroundColor: "#fffdd8",color: "#3f3c00",fontSize:"13px"}
            else if(facilite.montant < facilite.solde )
            return {fontSize:"13px",backgroundColor: "#ffdede", color: "#450000"}
            else return {fontSize:"13px"}
        }
    },[facilite])
    
    return (
        <tr>
            <TextTd value={facilite.employee.matricule} url={`/employees/${facilite.employee.matricule}`}/>
            {/* <TextTd value={facilite.employee.nom +' ' +facilite.    employee.prenom}  url={`/employees/${facilite.employee.matricule}`}/> */}
            <TextTd value={facilite.duree + ' Mois'} />
            <TextTd value={facilite.date_achat} />
            {/* <TextTd value={facilite.montant} style={{color:'white',backgroundColor:'green'}} /> */}
            <TextTd value={facilite.montant} style={{backgroundColor: "#d2ffe8",  color:"#00391" , fontSize:"13px"}} />
            <TextTd value={facilite.solde?.toFixed(2)}   style={soldeStyle}/>

            {
                montCells && montCells.map((month, index) =>
                    <Timeline key={`${month}`} facilite={facilite} month={month} />
                )
            }
            <TdNode>
                <small className={`badge ${facilite.is_completed ? 'bg-light-danger' : 'bg-light-success'}`}>{facilite.is_completed ? 'Closed' : 'open'}</small>
            </TdNode>
            
            <TdNode>
                <>                    
                    <MDropdown className="p-0" icon={<BsThreeDots />}>
                        <Dropdown.Item onClick={()=>{
                            dispatch(setCurrentEditFacilite({facilite:facilite}));
                            dispatch(setFIsModalEdit({show:!isModalEdit}))
                        }}>
                            <BsPencilSquare size={iconSize_sm} /> <span className="ms-2">Edit</span>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => { 
                            dispatch(setDelFaciliteId({faciliteId:facilite.id})); 
                            dispatch(setFIsModalDel({show:!isModalDel})); 
                            }} >
                            <BsTrash size={iconSize_sm} /> <span className="ms-2">Delete</span>
                        </Dropdown.Item>
                    </MDropdown>
                </>
            </TdNode>

        </tr>
    )
}
export default TableRow