import './styles.css';
import CardOfCategory from '../CardOfCategory';
import api from './../../services/api';
import { getItem } from './../../utils/storage'
import { useState, useEffect } from 'react'

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function FilterBox() {

    const { transactions, setFilteredTransactions, showCategories } = useContext(UserContext)

    const [categoryList, setCategoryList] = useState([])

    const token = getItem('token');

    function cleanFilters() {
        const localCategoryList = [...categoryList]
        const localCategoryListEdited = localCategoryList.map((category) => (
            {
                id: category.id,
                descricao: category.descricao,
                selectStatus: false
            }
        ))
        setCategoryList(localCategoryListEdited)
        setFilteredTransactions(transactions)
    }

    function filterCategories(localTransactions, selectedCategories) {
        if (!selectedCategories.length) {
            return localTransactions
        }

        const filteredList = []
        localTransactions.map((transaction) => {

            return selectedCategories.map((category) => {
                if (transaction.categoria_id === category.id) {
                    filteredList.push(transaction)
                }
            })
        })

        setFilteredTransactions(filteredList)
    }

    function applyFilters() {
        const localCategoryList = [...categoryList]

        const selectedCategories = localCategoryList.filter((category) => {
            return category.selectStatus === true
        })

        const localTransactions = transactions
        filterCategories(localTransactions, selectedCategories)
    }

    useEffect(() => {
        async function requestCategories() {
            try {
                const { data: categories } = await api.get('/categoria', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const categoriesWithStatus = categories.map((category) => (
                    {
                        id: category.id,
                        descricao: category.descricao,
                        selectStatus: false
                    }))
                setCategoryList(categoriesWithStatus)
                return
            } catch (error) {
                console.log(error)
            }
        }

        if (!categoryList.length) {
            requestCategories()
        }

    }, [showCategories]);

    return (
        <div className="filter-box">
            {showCategories &&
                < div className='category-container'>
                    <h6>Categoria</h6>
                    <div className='category-cards'>
                        {
                            categoryList.map((category) => (
                                <CardOfCategory
                                    key={category.id}
                                    category={category}
                                    categoryList={categoryList}
                                    setCategoryList={setCategoryList}
                                ></CardOfCategory>
                            ))
                        }
                    </div>
                    <div className='buttons'>
                        <button className='clean-filter'
                            onClick={() => cleanFilters()}
                        >Limpar Filtros</button>
                        <button className='apply-filter'
                            onClick={() => applyFilters()}
                        >Aplicar Filtros
                        </button>
                    </div>
                </div>
            }
        </div >
    )
}