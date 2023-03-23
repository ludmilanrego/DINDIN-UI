import './styles.css';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function AddTransactionButton() {

    const { setModal } = useContext(UserContext)

    return (
        <button
            className='addTransactionButton'
            onClick={() => {
                setModal({
                    status: 'addTransaction', transaction:
                    {
                        valor: "",
                        categoria_id: "",
                        data: "",
                        descricao: "",
                        tipo: "saida"
                    }
                })
            }}
        >Adicionar Registro</button>
    )
}