import React from 'react';
import Header from '../../components/Header';

import { DIV_PAGE, DIV_CONTAINER } from './styles';

const NotFoundPage = () => (

    <DIV_PAGE>
        <Header />

        <DIV_CONTAINER>
            <h1>404</h1>
            <span>Oops! Página não encontrada!</span>
        </DIV_CONTAINER>
        

    </DIV_PAGE>
);

export default NotFoundPage;