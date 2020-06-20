import React, { ChangeEvent, useContext } from 'react'

import { LeafletMouseEvent } from 'leaflet';
import MapBox from '../../MapBox';

import TextErrorMessage from '../../Messages/TextErrorMessage';
import { IncompleteFieldsOnFormContext } from '../../../pages/CreatePoint';

import { DIV, DIV_FIELD_GROUP, DIV_FIELD } from './styles';


interface MapProps {
    clickedOnMap: (event: LeafletMouseEvent) => void;
    selectedPosition: [number,number];
    initialPosition: [number, number];
}

interface Props {
    map?: MapProps;
    changeAddress: (event: ChangeEvent<HTMLSelectElement>) => void;
    selectedUf: string;
    ufs: string[];
    selectedCity: string;
    cities: string[];
}


const PointAddress: React.FC<Props> = ( props ) => {

    const {
        map, 
        changeAddress,
        selectedUf,
        ufs,
        selectedCity,
        cities,
    } = props;
    
    const incompleteForm = useContext( IncompleteFieldsOnFormContext);

    const isIncompleteField = (selectValue: String) => (incompleteForm && selectValue === '0') ? true : false;


    return (

        <fieldset>
            <legend>
                <h2>Endereço</h2>
                { (map) 
                    ? <span>Selecione o endereço no mapa</span>
                    : <span>Selecione a UF e a Cidade</span>
                }
            </legend>

            { (map) && (
                <DIV>
                    <MapBox 
                        initialPosition={ map.initialPosition || [0,0] }
                        selectedPosition={ map.selectedPosition || [0,0] }
                        clickedOnMap={ map.clickedOnMap }
                    />

                    { ( incompleteForm && map && map.selectedPosition[0] === 0 ) && 
                        <TextErrorMessage>*Selecione o ponto no mapa.</TextErrorMessage>
                    }
                </DIV>
            )}
            

            <DIV_FIELD_GROUP>
            
                <DIV_FIELD isFillingError={ isIncompleteField(selectedUf) } >

                    <label htmlFor="uf">Estado (UF)</label>

                    <select 
                        name="uf" id="uf" 
                        onChange={ changeAddress } 
                        value={ selectedUf }
                    >
                        <option value="0">Selecione uma UF</option>

                        { ufs.map( uf => (
                            <option key={ uf } value={ uf }>{ uf }</option>
                        ))}
                    
                    </select>

                </DIV_FIELD>
                

                <DIV_FIELD isFillingError={ isIncompleteField(selectedCity) } >

                    <label htmlFor="city">Cidade</label>

                    <select 
                        name="city" id="city"
                        onChange={ changeAddress }
                        value={ selectedCity }
                    >
                        <option value="0">Selecione uma cidade</option>
                        
                        { cities.map( city => (
                            <option key={ city } value={ city }>{ city }</option>
                        ))}
                    </select>
                
                </DIV_FIELD>
        
            </DIV_FIELD_GROUP>
            
        </fieldset>
    )
};

export default PointAddress;