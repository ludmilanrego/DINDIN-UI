import './styles.css';
import LogoIcon from '../../assets/LogoIcon.svg'

export default function Logo() {

    return (
        <div className="logo">
            <img
                className="logo-img"
                src={LogoIcon}
            ></img>
            <h4 className='logo-title'>Dindin</h4>
        </div>
    )
}