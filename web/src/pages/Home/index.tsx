import React from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';

import Header from '../../components/Header';
import ButtonLink from '../../components/Links/ButtonLink';
import DefaultLink from '../../components/Links/DefaultLink';

import './styles.css';


const Home = () => {

    return (
        <div id="page-home">
            <div className="content">

                <Header>
                    <DefaultLink to='/create-point'>
                        <FiLogIn />
                        Cadastre um ponto de coleta
                    </DefaultLink>
                </Header>
                
                <main>
                    <h1>Seu marketplace de coleta de resíduos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>

                    <ButtonLink to="/points">
                        <span><FiSearch /></span>
                        <strong>Encontre um ponto de coleta</strong>
                    </ButtonLink>
                </main>

            </div>
        </div>
    )
}

export default Home;