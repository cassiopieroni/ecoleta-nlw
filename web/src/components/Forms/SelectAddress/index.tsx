import React, { ChangeEvent, useContext } from 'react';

import { IncompleteFieldsOnFormContext } from '../../../pages/CreatePoint';

import '../sharedStyles.css';
import './styles.css';


interface Props {
    changeAddress: (event: ChangeEvent<HTMLSelectElement>) => void;
    selectedUf: string;
    ufs: string[];
    selectedCity: string;
    cities: string[];
}


const SelectAddress: React.FC<Props> = ( props ) => {

    const {
        changeAddress,
        selectedUf,
        ufs,
        selectedCity,
        cities,
    
    } = props;

    const incompleteForm = useContext( IncompleteFieldsOnFormContext);

    const ufStyle = ( incompleteForm && selectedUf === '0') ? 'error' : '';
    const cityStyle = ( incompleteForm && selectedCity === '0') ? 'error' : '';
    
    return (
            
        <div className="field-group">
            
            <div className="field">
                <label htmlFor="uf">Estado (UF)</label>

                <select 
                    name="uf" 
                    id="uf" 
                    onChange={ changeAddress } 
                    value={ selectedUf }
                    className={ ufStyle }
                >
                    <option value="0">Selecione uma UF</option>

                    { ufs.map( uf => (
                        <option key={ uf } value={ uf }>{ uf }</option>
                    ))}
                
                </select>

            </div>
            
            <div className="field">
                <label htmlFor="city">Cidade</label>
                <select 
                    name="city" 
                    id="city"
                    onChange={ changeAddress }
                    value={ selectedCity }
                    className={ cityStyle }
                >
                    <option value="0">Selecione uma cidade</option>
                    { cities.map( city => (
                        <option key={ city } value={ city }>{ city }</option>
                    ))}
                </select>
            </div>
        
        </div>
    )
};

export default SelectAddress;