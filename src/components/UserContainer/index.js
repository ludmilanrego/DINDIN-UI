import './styles.css';
import Exit from '../../assets/Exit.svg'
import Perfil from '../../assets/Perfil.svg'

import { setItem } from './../../utils/storage'
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';


export default function UserContainer() {

    const { user, setModal } = useContext(UserContext)

    const navigate = useNavigate()

    function logout() {
        setItem('token', '');
        navigate('/')
    }

    return (
        <div className="user-container">
            <img
                className="perfil-img"
                src={Perfil}
                onClick={() => setModal({ status: 'editProfile' })}
            ></img>
            <h5>{user.nome}</h5>
            <img
                className="exit-img"
                src={Exit}
                alt="icone sair"
                onClick={() => { logout() }}
            ></img>
        </div>
    )
}