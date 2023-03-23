import './styles.css';

import api from './../../services/api';

import { getItem } from './../../utils/storage'

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function TableRow({ transaction, setShowPopUp }) {
    const { requestTransactions } = useContext(UserContext)

    const token = getItem('token');

    async function deleteTransaction(event) {
        event.preventDefault();
        event.stopPropagation();
        try {
            const response = await api.delete(`/transacao/${transaction.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            requestTransactions()
            setShowPopUp(false)

        } catch (error) {
            console.log(error)
        }
    }

    function closePopUp(event) {
        event.preventDefault();
        event.stopPropagation();

        setShowPopUp(false)
    }

    return (
        <div id="pop-up">
            <h3
                id='pop-up-title'
            >Apagar item?</h3>
            <div>
                <button
                    id='pop-up-confirm'
                    onClick={(event) => { deleteTransaction(event) }}
                >Sim</button>
                <button
                    id='pop-up-cancel'
                    onClick={(event) => { closePopUp(event) }}
                >Não</button>
            </div>
        </div>
    )
}