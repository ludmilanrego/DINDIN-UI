import './styles.css';

import Triangle from '../../assets/Triangle.svg'
import { useState } from 'react'
import TableRow from '../TableRow';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Table() {

    const { filteredTransactions, setFilteredTransactions } = useContext(UserContext)

    const [sortUpOn, setSortUpOn] = useState(true)

    function toogleSortOfList() {

        setSortUpOn(!sortUpOn)

        if (sortUpOn) {
            let localFilteredTransactions = filteredTransactions

            localFilteredTransactions.sort((a, b) => {
                return (+(new Date(a.data))) - (+ (new Date(b.data)));
            });

            setFilteredTransactions(localFilteredTransactions)
        }
        if (!sortUpOn) {
            let localFilteredTransactions = filteredTransactions

            localFilteredTransactions.sort((a, b) => {
                return (+(new Date(b.data))) - (+ (new Date(a.data)));
            });

            setFilteredTransactions(localFilteredTransactions)
        }
    }

    return (
        <div className='table'>
            <div className='table-header'>
                <div className='table-row-section table-row-date'>
                    <span>
                        <span>Data</span>
                        <img
                            className="triangle-img"
                            src={Triangle}
                            onClick={() => toogleSortOfList()}
                        ></img>
                    </span>
                </div>

                <div className='table-row-section day-of-week'>
                    <span className='description'> Dia da semana </span>
                </div>

                <div className='table-row-section table-row-description'>
                    <span className='description'>Descrição</span>
                </div>

                <div className='table-row-section table-row-category'>
                    <span className='description'>Categoria</span>
                </div>

                <div className='table-row-section table-row-value'>
                    <span className='description'>Valor</span>
                </div>

                <div className='table-row-section icons'></div>
            </div>
            {
                filteredTransactions.map((transaction) => (
                    <TableRow
                        key={transaction.id}
                        transaction={transaction}
                    ></TableRow>
                ))
            }
        </div>
    )
}