import './styles.css';

import Triangle from '../../assets/Triangle.svg'
import { useState } from 'react'
import TableRow from '../TableRow';

import NavRight from '../../assets/navigate_right.png';
import NavLeft from '../../assets/navigate_left.png';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Table() {

    const { filteredTransactions, setFilteredTransactions } = useContext(UserContext)

    const [sortUpOn, setSortUpOn] = useState(true)

    const [page, setPage] = useState(1)
    const maxNumberPerPage = 5


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

    function ajustPage(list) {

        const itemsCountEnd = (maxNumberPerPage * page);
        const itemsCountStart = maxNumberPerPage * (page - 1);

        return list.slice(itemsCountStart, itemsCountEnd)
    }

    function decreasePage(event) {
        event.preventDefault();
        event.stopPropagation();

        if (page === 1) {
            return
        }

        const decreasedPage = page - 1
        setPage(decreasedPage)
    }

    function increasePage(event, list) {
        event.preventDefault();
        event.stopPropagation();

        if (((page * maxNumberPerPage)) > list.length) {
            return
        }

        const increasedPage = page + 1
        setPage(increasedPage)
    }

    return (
        <div className='table'>
            <div className='table-header'>
                <div className='table-row-section table-row-date'>
                    <span>Data</span>
                    <img
                        className="triangle-img"
                        src={Triangle}
                        alt="ordenar-lista"
                        onClick={() => toogleSortOfList()}
                    ></img>
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
                ajustPage(filteredTransactions).map((transaction) => (
                    <TableRow
                        key={transaction.id}
                        transaction={transaction}
                    ></TableRow>
                ))
            }
            <div className='table-footer'>
                <img
                    className="exit-img"
                    src={NavLeft}
                    alt="retomar-pagina"
                    onClick={(event) => decreasePage(event, filteredTransactions)}
                ></img>
                <img
                    className="exit-img"
                    src={NavRight}
                    alt="avançar-pagina"
                    onClick={(event) => increasePage(event, filteredTransactions)}
                ></img>
            </div>
        </div>
    )
}