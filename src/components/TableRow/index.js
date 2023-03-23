import './styles.css';
import { useState } from 'react'
import { dayOfWeekInPortuguese, formatToModelDate } from '../../utils/dateFormat'

import EditIcon from '../../assets/Edit-icon.svg'
import TrashIcon from '../../assets/Trash-Icon.svg'

import PopUp from '../PopUp'

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function TableRow({ transaction }) {

    const { setModal } = useContext(UserContext)
    const [showPopUp, setShowPopUp] = useState(false)

    function activateShowPopUp(event) {
        event.preventDefault();
        event.stopPropagation();

        setShowPopUp(true)
    }

    return (
        <div className='table-row'>

            <div className='table-row-section table-row-date'>
                <span className='bold black'>
                    {formatToModelDate(transaction.data)}
                </span>
            </div>

            <div className='table-row-section day-of-week'>
                <span className='description'> {dayOfWeekInPortuguese(transaction.data)} </span>
            </div>

            <div className='table-row-section table-row-description'>
                <span className='description'>{transaction.descricao}</span>
            </div>

            <div className='table-row-section table-row-category'>
                <span className='description'>{transaction.categoria_nome}</span>
            </div>

            <div className='table-row-section table-row-value'>
                <span className={transaction.tipo === "entrada" ? 'bold purple' : 'bold orange'}>{transaction.valor}</span>
            </div>

            <div className='table-row-section icons'>
                <img
                    className="logo-img"
                    src={EditIcon}
                    onClick={() => { setModal({ status: 'editTransaction', transaction: transaction }) }}
                ></img>
                <img
                    className="logo-img"
                    src={TrashIcon}
                    onClick={(event) => activateShowPopUp(event)}
                ></img>
                {
                    showPopUp && <PopUp
                        setShowPopUp={setShowPopUp}
                        transaction={transaction}
                    ></PopUp>
                }
            </div>
        </div >
    )
}