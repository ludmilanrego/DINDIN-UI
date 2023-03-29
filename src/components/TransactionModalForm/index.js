import './styles.css';
import { useState } from 'react'
import { getItem } from '../../utils/storage'
import api from '../../services/api';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';


export default function TransactionModalForm() {

    const { modal, setModal, requestTransactions, categoryList } = useContext(UserContext)

    const token = getItem('token');

    const [modalForm, setModalForm] = useState(
        {
            valor: modal.transaction.valor,
            categoria_id: modal.transaction.categoria_id,
            data: modal.transaction.data,
            descricao: modal.transaction.descricao,
            tipo: modal.transaction.tipo
        }
    );
    const [select, setSelect] = useState({ id: '', descricao: '' });
    const categoryOptions = categoryList

    async function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!modalForm.valor || !modalForm.categoria_id || !modalForm.data || !modalForm.descricao || !modalForm.tipo) {
            return;
        }

        if (modal.status === "addTransaction") {
            return addTransaction()
        }

        if (modal.status === 'editTransaction') {
            editTransaction()
            requestTransactions()
        }
    }

    function clearForm() {
        setModalForm(
            {
                valor: "",
                categoria_id: "",
                data: "",
                descricao: "",
                tipo: "saida"
            }
        )
    }

    function handleForm(event) {
        event.preventDefault();
        event.stopPropagation();

        setModalForm({ ...modalForm, [event.target.name]: event.target.value })
    }

    async function addTransaction() {

        try {
            await api.post('/transacao',
                {
                    ...modalForm
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            requestTransactions()
            clearForm();
            setModal({ status: 'none' })

        } catch (error) {
            console.log(error)
        }
    }

    async function editTransaction() {

        try {
            await api.put(`/transacao/${modal.transaction.id}`,
                {
                    ...modalForm
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            clearForm();
            setModal({ status: 'none' })

        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeSelect(event) {

        event.preventDefault()
        event.stopPropagation()

        const localOptions = [...categoryOptions];

        const myOption = localOptions.find((item) => item.id === parseInt(event.target.value));

        setModalForm({ ...modalForm, categoria_id: event.target.value })
        setSelect({ id: myOption.id, descricao: myOption.descricao });
    }

    return (
        <>
            <div className='modal-type-buttons'>
                <button
                    type='button'
                    id={modalForm.tipo === "entrada" ? "selected-type-modal-income" : "not-seleted-modal-income"}
                    onClick={() => setModalForm({ ...modalForm, tipo: "entrada" })}
                >Entrada</button>
                <button
                    type='button'
                    id={modalForm.tipo === "saida" ? "selected-type-modal-outcome" : "not-seleted-modal-outcome"}
                    onClick={() => setModalForm({ ...modalForm, tipo: "saida" })}
                >Saída</button>
            </div>

            <form className='modal-form'
                onSubmit={(event) => handleSubmit(event)}
            >
                <div className='input-container' >
                    <label htmlFor='valor'>Valor</label>
                    <input
                        type='text'
                        name='valor'
                        value={modalForm.valor}
                        onChange={(event) => handleForm(event)}
                    />
                </div>
                <div className='input-container' >
                    <label htmlFor='categoria_id'>Categoria</label>
                    {select.descricao}

                    <select
                        value={select.id}
                        onChange={(event) => handleChangeSelect(event)}
                    >
                        {categoryOptions.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}>
                                {item.descricao}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='input-container' >
                    <label htmlFor='data'>Data</label>
                    <input
                        type='date'
                        name='data'
                        value={modalForm.data}
                        onChange={(event) => handleForm(event)}
                    />
                </div>
                <div className='input-container' >
                    <label htmlFor='descricao'>Descrição</label>
                    <input
                        type='text'
                        name='descricao'
                        value={modalForm.descricao}
                        onChange={(event) => handleForm(event)}
                    />
                </div>
                <button
                    className='confirm-modal-button'
                    type='submit'
                >Confirmar</button>
            </form>
        </>
    )
}