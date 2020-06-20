import React from 'react';
import { useHistory } from 'react-router-dom';

import PrimaryLink from '../Links/PrimaryLink';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

import { HEADER } from './styles';

const Header: React.FC = ({ children }) => {

    const history = useHistory();

    const handleNavToHome = () => history.push('/');


    const LinkToHome = (
        <PrimaryLink to='/'>
            <FiArrowLeft />
            Voltar para home
        </PrimaryLink>
    );

    return (
    
        <HEADER>

            <img src={ logo } alt="logotipo ecoleta" onClick={ handleNavToHome } />
            
            { children ? children : LinkToHome }
            
        </HEADER>
    )
};

export default Header;