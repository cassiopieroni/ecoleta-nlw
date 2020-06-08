import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';


interface Props {
    isLinkToHome ? : boolean;
}


const Header: React.FC<Props> = ({ isLinkToHome }) => (
    
    <header className='layout-header'>
        <img src={ logo } alt="logotipo ecoleta"/>
        { isLinkToHome && (
            <Link to='/'>
                <FiArrowLeft />
                Voltar para a home
            </Link>
        )}
    </header>
);

export default Header;