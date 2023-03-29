import './styles.css';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import ResumeData from '../ResumeData';

export default function Resume() {

    return (
        <div className='resume-info'>
            <h6>Resumo</h6>
            <ResumeData></ResumeData>
        </div>
    )
}