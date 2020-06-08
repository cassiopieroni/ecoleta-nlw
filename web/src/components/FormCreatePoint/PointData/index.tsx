import React, { ChangeEvent } from 'react';


import '../sharedStyles.css';

interface Props {
    changed: (event: ChangeEvent<HTMLInputElement>) => void;
}


const PointData: React.FC<Props> = ({ changed }) => (

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
            />
        </div>

        <div className="field-group">
            
            <div className="field">
                <label htmlFor="email">email</label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    onChange={ changed }
                />
            </div>
            
            <div className="field">
                <label htmlFor="whatsapp">whatsapp</label>
                <input 
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    onChange={ changed }
                />
            </div>
        
        </div>
    </fieldset>
);

export default PointData;