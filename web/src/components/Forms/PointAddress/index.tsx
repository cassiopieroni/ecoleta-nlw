import React, { ChangeEvent, useContext } from 'react'

import { LeafletMouseEvent } from 'leaflet';
import MapBox from '../../MapBox';

import IncompleteFormMessage from '../IncompleteFormMessage';
import { IncompleteFieldsOnFormContext } from '../../../pages/CreatePoint';

import SelectAddress from '../SelectAddress';

import '../sharedStyles.css';
import './styles.css';


interface Props {
    clickedOnMap: (event: LeafletMouseEvent) => void;
    changeAddress: (event: ChangeEvent<HTMLSelectElement>) => void;
    initialPosition: [number,number];
    selectedPosition: [number,number];
    selectedUf: string;
    ufs: string[];
    selectedCity: string;
    cities: string[];

}


const PointAddress: React.FC<Props> = ( props ) => {

    const {
        clickedOnMap, 
        changeAddress,
        initialPosition,  
        selectedPosition,
        selectedUf,
        ufs,
        selectedCity,
        cities,
    
    } = props;

    const incompleteForm = useContext( IncompleteFieldsOnFormContext);
    
    return (

        <fieldset className='layout-fieldset'>
            <legend>
                <h2>Endereço</h2>
                <span>Selecione o endereço no mapa</span>
            </legend>

            <div className='map'>
                <MapBox 
                    initialPosition={ initialPosition }
                    selectedPosition={ selectedPosition }
                    clickedOnMap={ clickedOnMap }
                />

                { ( incompleteForm && selectedPosition[0] === 0 ) && 
                    <IncompleteFormMessage>*Selecione o ponto no mapa.</IncompleteFormMessage>
                }
            </div>

            <SelectAddress 
                changeAddress={ changeAddress }
                selectedUf={ selectedUf }
                ufs={ ufs }
                selectedCity={ selectedCity }
                cities={ cities }
            />
            
        </fieldset>
    )
};

export default PointAddress;