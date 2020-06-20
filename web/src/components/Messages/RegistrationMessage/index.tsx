import React from 'react';

import PrimaryLink from '../../Links/PrimaryLink';

import { FiArrowLeft } from 'react-icons/fi';
import { MdErrorOutline } from 'react-icons/md'
import { FaRegCheckCircle } from 'react-icons/fa';

import { DIV, DIV_MESSAGE_BOX } from './styles';


interface Props {
    isMessage: boolean,
    error: {
        statusCode?: number,
        message?: string,
        error?: string,
    }
}

const RegistrationMessage: React.FC<Props> = ({ isMessage, error }) => {
    
    if (!isMessage) {
        return null;
    }


    return (

        <DIV>
            <DIV_MESSAGE_BOX>
                { error.statusCode ? (
                    <>
                        <h2>{`${error.error} (${error.statusCode})`}</h2>
                        <div>
                            <MdErrorOutline size={ 50 } color='red' />
                            <p>Oops! Tivemos um problema. Cadastro não efetuado!</p>
                        </div>
                    </>
                ) : (
                    <>
                        <h2>Cadastro efetuado!</h2>
                        <div>
                            <FaRegCheckCircle size={ 50 } color='#34CB79' />
                            <p>Ponto de coleta cadastrado com sucesso!</p>
                        </div>
                    </>
                )}

                <PrimaryLink to='/'>
                    <FiArrowLeft />
                    Voltar para a home
                </PrimaryLink>

            </DIV_MESSAGE_BOX>    
        </DIV>
    )
}
export default RegistrationMessage;