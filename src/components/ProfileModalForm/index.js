import './styles.css';
import { useState, useEffect } from 'react'
import { getItem } from '../../utils/storage'
import api from '../../services/api';

import { checkValidForm } from '../../utils/general'

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function ProfileModal() {

    const { setUser, setModal } = useContext(UserContext)

    const token = getItem('token');

    const [form, setForm] = useState(
        {
            nome: '',
            email: '',
            senha: ''
        }
    )
    const [confirmationPassword, setConfirmationPassword] = useState('');

    function clearForm() {
        setForm(
            {
                nome: '',
                email: '',
                senha: ''
            }
        );
        setConfirmationPassword('');
    }

    function handleConfirmationPassword(event) {
        setConfirmationPassword(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        subscribe();
        clearForm();
    }

    function handleForm(event) {
        const value = event.target.value;
        const name = event.target.name
        setForm({ ...form, [name]: value })
    }


    async function subscribe() {

        if (!checkValidForm(form, confirmationPassword)) {
            return;
        }

        try {
            const response = await api.put('/usuario', {
                nome: form.nome,
                email: form.email,
                senha: form.senha
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            setUser(form)
            clearForm()
            setModal({ status: 'none' })

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <form
                className='modal-form'
                onSubmit={(event) => handleSubmit(event)}
            >
                <div
                    className='input-container'
                >
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        name='nome'
                        value={form.nome}
                        onChange={(event) => handleForm(event)}
                    />
                </div>
                <div
                    className='input-container'
                >
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        name='email'
                        value={form.email}
                        onChange={(event) => handleForm(event)}
                    />
                </div>
                <div
                    className='input-container'
                >
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        name='senha'
                        value={form.senha}
                        onChange={(event) => handleForm(event)}
                    />
                </div>
                <div
                    className='input-container'
                >
                    <label htmlFor="confirmationPassword">Confirmação de senha</label>
                    <input
                        type="password"
                        name='confirmationPassword'
                        value={confirmationPassword}
                        onChange={(event) => handleConfirmationPassword(event)}
                    />
                </div>
                <button
                    className='confirm-modal-button'
                >Confirmar</button>

            </form>
        </>
    )
}