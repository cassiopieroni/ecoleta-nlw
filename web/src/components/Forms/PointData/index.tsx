import React, { ChangeEvent, useContext } from 'react';

import IncompleteFormMessage from '../IncompleteFormMessage';

import '../sharedStyles.css';

import { IncompleteFieldsOnFormContext } from '../../../pages/CreatePoint';


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

    const incompleteForm = useContext( IncompleteFieldsOnFormContext);


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
                    <IncompleteFormMessage>*Preencha o nome.</IncompleteFormMessage>
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
                        <IncompleteFormMessage>*Preencha o email.</IncompleteFormMessage>
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
                        <IncompleteFormMessage>*Preencha o whatsapp.</IncompleteFormMessage>
                    }
                </div>
            
            </div>
        </fieldset>
    )
};

export default PointData;