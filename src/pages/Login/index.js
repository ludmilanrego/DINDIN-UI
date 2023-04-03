import Logo from '../../components/Logo';

import api from './../../services/api'
import { setItem } from './../../utils/storage'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { getItem } from './../../utils/storage'

import './styles.css'

const token = getItem('token');

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState(
    {
      email: '',
      senha: ''
    }
  )

  const [warningSpan, setWarningSpan] = useState('')

  function clearForm() {
    setForm(
      {
        email: '',
        senha: ''
      }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    doLogin();
    clearForm();
  }

  function handleForm(event) {
    const value = event.target.value;
    const name = event.target.name
    setForm({ ...form, [name]: value })
  }

  async function doLogin() {
    try {
      if (!form.email || !form.senha) {
        setWarningSpan('Email e senha obrigatórios')
        setTimeout(() => {
          setWarningSpan('')
        }, 1000);
        return
      }

      const response = await api.post('/login', {
        email: form.email,
        senha: form.senha
      });

      if (response.status === 200) {
        setItem('token', response.data.token);
        clearForm();
        navigate('/home')
        return
      }
      setWarningSpan('Email ou senha inválida ou problema de conexão')

    } catch (error) {
      setWarningSpan(error.response.data.mensagem)
      setTimeout(() => {
        setWarningSpan('')
      }, 1000);
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/home")
    }
  }, [])

  return (
    <div className="container">
      <div className="header">
        <Logo></Logo>
      </div>
      <div className="login-main">
        <div className="info">
          <h1> Controle suas <span>finanças</span>, sem planilha chata.</h1>
          <h2> Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</h2>
          <button onClick={() => { navigate('/cadastro') }}>Cadastre-se</button>
        </div>
        <div className="login-box">
          <form
            className='form'
            onSubmit={(event) => handleSubmit(event)}
          >
            <h3>Login</h3>
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
              <label htmlFor="senha">Password</label>
              <input
                type="password"
                name='senha'
                value={form.senha}
                onChange={(event) => handleForm(event)}
              />
              <span>{warningSpan}</span>
            </div>
            <button className='purple-button'>Entrar</button>

            <span className='navigate-to-subscribe-span'
              onClick={() => navigate('/')}
            >
              Ainda não tem cadastro? Clique aqui!
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
