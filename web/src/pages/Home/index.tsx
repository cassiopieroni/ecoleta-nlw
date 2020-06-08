import React from 'react';
import { Link } from 'react-router-dom'
import { FiLogIn, FiSearch } from 'react-icons/fi';

import Header from '../../components/Header';

import './styles.css';




const Home = () => {

    return (
        <div id="page-home">
            <div className="content">

                <Header />
                
                <main>
                    <h1>Seu marketplace de coleta de resíduos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>

                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>

                    <Link to="/points">
                        <span>
                            <FiSearch />
                        </span>
                        <strong>Encontre um ponto de coleta</strong>
                    </Link>
                
                </main>

            </div>
        </div>
    )
}

export default Home;