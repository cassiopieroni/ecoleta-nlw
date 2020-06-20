import React from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';

import Header from '../../components/Header';
import SecondaryLink from '../../components/Links/SecondaryLink';
import PrimaryLink from '../../components/Links/PrimaryLink';

import coletaImg from '../../assets/home-background.svg';

import { DIV_PAGE_HOME, DIV_CONTENT, DIV_IMAGE_BOX } from './styles';


const Home = () => {

    const LinkToCreatePoint = () => (
        <PrimaryLink to='/create-point'>
            <FiLogIn />
            Cadastre um ponto de coleta
        </PrimaryLink>
    );

    return (
        <DIV_PAGE_HOME>
            <DIV_CONTENT>

                <Header> 
                    <LinkToCreatePoint /> 
                </Header>
                
                <main>

                    <div>
                        <h1>Seu marketplace de coleta de resíduos</h1>
                        <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>

                        <SecondaryLink to="/points">
                            <span><FiSearch /></span>
                            <strong>Encontre um ponto de coleta</strong>
                        </SecondaryLink>
                    </div>

                    <DIV_IMAGE_BOX>
                        <img src={ coletaImg } alt="coleta de recicláveis"/>
                    </DIV_IMAGE_BOX>

                </main>

                
            </DIV_CONTENT>
        </DIV_PAGE_HOME>
    )
}

export default Home;