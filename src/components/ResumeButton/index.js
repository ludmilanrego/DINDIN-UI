import './styles.css';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function ResumeButton() {

    const { setModal } = useContext(UserContext)

    return (
        <button
            className='resume-button'
            onClick={() => {
                setModal({
                    status: 'resume'
                })
            }}
        >Resumo</button>
    )
}