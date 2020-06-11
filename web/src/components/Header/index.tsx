import React from 'react';

import DefaultLink from '../Links/DefaultLink';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';


const Header: React.FC = ({ children }) => (
    
    <header className='layout-header'>
        <img src={ logo } alt="logotipo ecoleta"/>
        { children ? (
            children
        ) : (
            <DefaultLink to='/'>
                <FiArrowLeft />
                Voltar para home
            </DefaultLink>
        ) }
    </header>
);

export default Header;