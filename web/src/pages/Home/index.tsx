import React from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';

import Header from '../../components/Header';
import DefaultLink from '../../components/DefaultLink';

import './styles.css';




const Home = () => {

    return (
        <div id="page-home">
            <div className="content">

                <Header />
                
                <main>
                    <h1>Seu marketplace de coleta de resíduos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>

                    <DefaultLink to='/create-point'>
                        <span><FiLogIn /></span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </DefaultLink>

                    <DefaultLink to="/points">
                        <span><FiSearch /></span>
                        <strong>Encontre um ponto de coleta</strong>
                    </DefaultLink>
                
                </main>

            </div>
        </div>
    )
}

export default Home;