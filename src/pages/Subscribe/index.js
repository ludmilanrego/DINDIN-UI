import Logo from '../../components/Logo';

import api from './../../services/api'

import { checkValidForm } from '../../utils/general'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { getItem } from './../../utils/storage'

import './styles.css'

const token = getItem('token');

function Subscribe() {
  const navigate = useNavigate()

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
      return
    }

    try {
      const response = await api.post('/usuario', {
        nome: form.nome,
        email: form.email,
        senha: form.senha
      });

      if (response.status == 201) {
        clearForm();
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/home")
    }
  }, [])

  return (
    <div className="subscribe-container">
      <div className="subscribe-header">
        <Logo></Logo>
      </div>
      <div className="subscribe-main">
        <div className="subscribe-box">
          <form
            className='subscribe-form'
            onSubmit={(event) => handleSubmit(event)}
          >
            <h3>Cadastre-se</h3>
            <div
              className='subscribe-input-container'
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
              className='subscribe-input-container'
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
              className='subscribe-input-container'
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
              className='subscribe-input-container'
            >
              <label htmlFor="confirmationPassword">Confirmação de senha</label>
              <input
                type="password"
                name='confirmationPassword'
                value={confirmationPassword}
                onChange={(event) => handleConfirmationPassword(event)}
              />
            </div>
            <button className='purple-button'>Cadastrar</button>
            <span
              onClick={() => navigate('/')}
            >
              Já tem cadastro? Clique aqui!
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;