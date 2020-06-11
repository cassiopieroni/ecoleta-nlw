import React, { ChangeEvent, useContext } from 'react';

import FillErrorMessage from '../../FillErrorMessage';

import '../sharedStyles.css';

import { IncompleteFieldsOnForm } from '../../../pages/CreatePoint';


interface Props {
    changed: (event: ChangeEvent<HTMLInputElement>) => void;
    data: {
        name: string,
        email: string,
        whatsapp: string,
    }
}


const PointData: React.FC<Props> = ({ changed, data }) => {

    const { name, email, whatsapp } = data;

    const incompleteForm = useContext( IncompleteFieldsOnForm);


    return (

        <fieldset className='layout-fieldset'>
            <legend>
                <h2>Dados</h2>
            </legend>

            
            <div className="field">
                
                <label htmlFor="name">Nome da entidade</label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    onChange={ changed }
                    value={ name }
                />

                { ( incompleteForm && !name ) && 
                    <FillErrorMessage>*Preencha o nome.</FillErrorMessage>
                }
            </div>

            <div className="field-group">
                
                <div className="field">
                    <label htmlFor="email">email</label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        onChange={ changed }
                        value={ email }
                    />
                    { ( incompleteForm && !email ) && 
                        <FillErrorMessage>*Preencha o email.</FillErrorMessage>
                    }
                </div>
                
                <div className="field">
                    <label htmlFor="whatsapp">whatsapp</label>
                    <input 
                        type="text"
                        name="whatsapp"
                        id="whatsapp"
                        onChange={ changed }
                        value={ whatsapp }
                    />
                    { ( incompleteForm && !whatsapp ) && 
                        <FillErrorMessage>*Preencha o whatsapp.</FillErrorMessage>
                    }
                </div>
            
            </div>
        </fieldset>
    )
};

export default PointData;