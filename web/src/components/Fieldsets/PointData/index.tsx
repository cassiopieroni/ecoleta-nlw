import React, { ChangeEvent, useContext } from 'react';

import { DIV_FIELD, DIV_FIELD_GROUP } from './styles';

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

    const isIncompleteField = (fieldValue: String) => (incompleteForm && !fieldValue) ? true : false;


    return (

        <fieldset>
            <legend>
                <h2>Dados</h2>
            </legend>

            
            <DIV_FIELD isFillingError={ isIncompleteField(name) } >
                
                <label htmlFor="name">Nome da entidade</label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    onChange={ changed }
                    value={ name }
                />

            </DIV_FIELD>


            <DIV_FIELD_GROUP>
                
                <DIV_FIELD isFillingError={ isIncompleteField(email) } >

                    <label htmlFor="email">email</label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        onChange={ changed }
                        value={ email }
                    />

                </DIV_FIELD>
                

                <DIV_FIELD isFillingError={ isIncompleteField(whatsapp) } >

                    <label htmlFor="whatsapp">whatsapp</label>
                    <input 
                        type="text"
                        name="whatsapp"
                        id="whatsapp"
                        onChange={ changed }
                        value={ whatsapp }
                    />
                    
                </DIV_FIELD>
            
            </DIV_FIELD_GROUP>
        </fieldset>
    )
};

export default PointData;