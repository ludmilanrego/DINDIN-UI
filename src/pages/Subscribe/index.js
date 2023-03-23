import Logo from '../../components/Logo';

import api from './../../services/api'

import { checkValidForm } from '../../utils/general'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './styles.css'

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

  return (
    <div className="subscribe-container">
      <div className="header">
        <Logo></Logo>
      </div>
      <div className="main">
        <div className="subscribe-box">
          <form
            className='form'
            onSubmit={(event) => handleSubmit(event)}
          >
            <h3>Cadastre-se</h3>
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
            <button className='purple-button'>Cadastrar</button>
            <span
              onClick={() => navigate('/login')}
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
