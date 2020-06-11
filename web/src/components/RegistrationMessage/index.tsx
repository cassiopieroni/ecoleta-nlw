import React from 'react';
import DefaultLink from '../Links/DefaultLink';
import { FiArrowLeft } from 'react-icons/fi';
import { MdErrorOutline } from 'react-icons/md'
import { FaRegCheckCircle } from 'react-icons/fa';

import './styles.css';

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
        <div className='messageBg'>
            <div className='message' >
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

                <DefaultLink to='/'>
                    <FiArrowLeft />
                    Voltar para a home
                </DefaultLink>
            </div>    
        </div>
    )
}
export default RegistrationMessage;