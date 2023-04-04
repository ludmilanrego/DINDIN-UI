import './styles.css';
import FilterIcon from '../../assets/Filter-icon.svg'

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Filter() {

    const { showCategories, setShowCategories } = useContext(UserContext)

    function toggleShowCategories() {
        const localShowCategories = !showCategories;
        setShowCategories(localShowCategories)
    }

    return (
        <div className="filter">
            <button className='filter-button'
                onClick={() => { toggleShowCategories() }}>
                <img
                    className="filter-img"
                    src={FilterIcon}
                ></img>
                <span>Filtrar</span>
            </button>
        </div >
    )
}