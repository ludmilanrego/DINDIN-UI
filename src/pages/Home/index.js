import Header from '../../components/Header';
import Resume from '../../components/Resume';
import Filter from '../../components/Filter';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import AddTransactionButton from '../../components/AddTransactionButton';

import api from './../../services/api';
import { useState, useEffect } from 'react'
import { getItem } from './../../utils/storage'

import './styles.css'

import UserContext from '../../contexts/UserContext';

function Home() {

    const [user, setUser] = useState('')
    const [transactions, setTransactions] = useState([])
    const [filteredTransactions, setFilteredTransactions] = useState([])
    const [modal, setModal] = useState({ status: 'none' });
    const [categoryList, setCategoryList] = useState([])
    const [resumeData, setResumeData] = useState(
        {
            entrada: '',
            saida: ''
        }
    )

    const token = getItem('token');

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

    async function requestResumeData() {
        try {
            const response = await api.get('/transacao/extrato', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setResumeData(response.data);

        } catch (error) {
            console.log(error)
        }
    }

    async function requestTransactions() {
        try {
            const response = await api.get('/transacao', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setTransactions(response.data);
                setFilteredTransactions(response.data)
                requestResumeData()
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function requestUserData() {
        try {
            const response = await api.get('/usuario', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setUser(response.data);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        requestUserData();
        requestTransactions()
        requestCategories()
    }, []);

    return (

        <UserContext.Provider value={{
            user, setUser, modal, setModal, requestTransactions, categoryList,
            transactions, setFilteredTransactions, filteredTransactions, resumeData
        }}>

            <div className='home-container'>
                <Header
                ></Header>
                <main>
                    {modal.status !== "none" && <Modal></Modal>}
                    <div className='left-side'>
                        <Filter ></Filter>
                        <Table></Table>
                    </div>
                    <div className='right-side'>
                        <Resume></Resume>
                        <AddTransactionButton></AddTransactionButton>
                    </div>
                </main >
            </div >
        </UserContext.Provider>
    );
}
export default Home;


