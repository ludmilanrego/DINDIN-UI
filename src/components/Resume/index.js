import './styles.css';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Resume() {

    const { resumeData } = useContext(UserContext)

    return (
        <div className='resume-info'>
            <h6>Resumo</h6>
            <div className='income'>
                <span className='description'>Entradas</span>
                <span className='purple'>R$ {resumeData.entrada}</span>
            </div>
            <div className='outcome'>
                <span className='description'>Saídas</span>
                <span className='orange'>R$ {resumeData.saida}</span>
            </div>
            <div className='balance'>
                <span className='description'>Saldo</span>
                <span className='blue'>R$ {parseInt(resumeData.entrada) - parseInt(resumeData.saida)}</span>
            </div>
        </div>
    )
}