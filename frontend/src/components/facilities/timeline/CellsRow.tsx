import { useAppDispatch } from "app/hooks"
import MDropdown from "components/common/MDropdown"
import { useState } from "react"
import { Dropdown } from "react-bootstrap"
import { BsPencilSquare, BsThreeDots, BsTrash } from "react-icons/bs"
import { Link } from "react-router-dom"
import { IFacilite } from "types/types.facilities"
import { iconSize_sm } from "value"
import UpdateFacilite from "../UpdateFacilite"
import '../facilities.css'
import Cells from "./Cells"


interface YearRowProps {
    year: number,
    facilite: IFacilite
}

const CellsRow = ({ facilite, year }: YearRowProps) => {
    // console.log('render CellsRow Componente')
    // console.log(year)

    const dispatch = useAppDispatch()
    const [editFacilite, setEditFacilite] = useState(false);
    const [montCells] = useState<number[]>(Array.from({ length: 12 }, (value, index) => index + 1))
    // const [newFacilite, setNewFacilite] = useState<IFacilite>({})
    const [show, setShow] = useState(false);

    const handleEditFacilite = () => {
        setShow(!show)
    }

    return (
        <>
            <div className={`d-flex`} >
                <div
                    className={`cell-border  text-center cell flex-cell ${facilite.montant <= facilite?.solde ? 'facilite-completed' : ''}`}
                    // className={`cell-border  text-center cell flex-cell`}
                    style={{ borderLeft: '1px solid #e6e6e6' }}
                >
                    <Link target="blank" to={`/employees/${facilite.employee.matricule}/`}>
                        <small>{facilite.employee.matricule}</small>
                    </Link>
                </div>

                {/* <div className="cell-border text-center employee-cell flex-cell">
                    <Link target="blank" to={`/employees/${facilite.employee.matricule}/`}>
                        <small>{facilite.employee.nom.substring(0, 15)} {facilite.employee.prenom.substring(0, 10)}</small>
                    </Link>
                </div> */}
                <div className="cell-border text-center cell flex-cell"><small>{facilite.duree} Mois</small></div>
                <div className="cell-border text-center cell flex-cell"><small>{facilite.date_achat}</small></div>
                <div className="cell-border text-center montant-cell flex-cell"><small>{facilite.montant}</small></div>
                <div className="cell-border text-center montant-cell flex-cell"><small>{facilite.solde}</small></div>

                {/* {
                    montCells && montCells.map((month, index) =>
                        <div key={index} className="cell-border fw-bold text-center cell flex-cell">
                            {isExistMont(month)}
                        </div>
                    )
                } */}
                {
                    montCells && montCells.map((month, index) =>
                        <div key={index} className="cell-border fw-bold text-center cell flex-cell">
                            <Cells facilite={facilite} month={month} year={year} />
                        </div>
                    )
                }
                <div className={`cell-border text-center cell flex-cell`} >
                    <small className={`badge ${facilite.is_completed ? 'bg-light-success' : 'bg-light-primary'}`}>{facilite.is_completed ? 'Closed':'open'}</small>
                </div>
                <div className={`cell-border text-center cell flex-cell`} >
                    <div className="buttons p-0 d-flex justify-content-center">
                        {/* <div className="mx-1" onClick={handleCloseFacilite} >
                            <BsUnlockFill color={'red'} />
                        </div> */}
                        {/* <FaciliteDropdownMenu faciliteId={facilite.id} /> */}
                    </div>
                    <MDropdown className=" p-0" icon={<BsThreeDots />}>
                        <Dropdown.Item onClick={handleEditFacilite}>
                            <BsPencilSquare size={iconSize_sm} /> <span className="ms-2">Edit</span>
                        </Dropdown.Item>
                        <Dropdown.Item >
                            <BsTrash size={iconSize_sm} /> <span className="ms-2">Delete</span>
                        </Dropdown.Item>
                    </MDropdown>
                    <UpdateFacilite facilite={facilite} show={show} setShow={setShow}/>
                </div>
            </div>
        </>
    )
}

export default CellsRow