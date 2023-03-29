import './styles.css';

import ExitX from '../../assets/x.svg'
import TransactionModalForm from '../TransactionModalForm';
import ProfileModalForm from '../ProfileModalForm';
import ResumeData from '../ResumeData';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Modal() {

    const { modal, setModal } = useContext(UserContext)

    return (
        <div className="modal-background">
            <div className={modal.status === 'resume' ? 'small-modal' : 'regular-modal'}>
                <div className='modal-header'>
                    {modal.status === 'addTransaction' &&
                        <h6 className='modal-title'>
                            Adicionar Registro</h6>}
                    {modal.status === 'editTransaction' &&
                        <h6 className='modal-title'>
                            Editar Registro</h6>}
                    {modal.status === 'editProfile' &&
                        <h6 className='modal-title'>
                            Editar Perfil</h6>}
                    {modal.status === 'resume' &&
                        <h6 className='modal-title'>
                            Resumo</h6>}
                    <img
                        className="exit-img"
                        src={ExitX}
                        onClick={() => setModal({ status: 'none' })}
                    ></img>
                </div>
                {modal.status === 'addTransaction' &&
                    <TransactionModalForm></TransactionModalForm>}
                {modal.status === 'editTransaction' &&
                    <TransactionModalForm></TransactionModalForm>}
                {modal.status === 'editProfile' &&
                    <ProfileModalForm></ProfileModalForm>}
                {modal.status === 'resume' &&
                    <ResumeData></ResumeData>}

            </div>
        </div>
    )
}

