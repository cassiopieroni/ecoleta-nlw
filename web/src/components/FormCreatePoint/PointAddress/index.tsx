import React, { ChangeEvent, useContext } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import FillErrorMessage from '../../FillErrorMessage';
import { IncompleteFieldsOnForm } from '../../../pages/CreatePoint';

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

    const incompleteForm = useContext( IncompleteFieldsOnForm);

    const ufStyle = ( incompleteForm && selectedUf === '0') ? 'error' : '';
    const cityStyle = ( incompleteForm && selectedCity === '0') ? 'error' : '';
    
    return (

        <fieldset className='layout-fieldset'>
            <legend>
                <h2>Endereço</h2>
                <span>Selecione o endereço no mapa</span>
            </legend>

            <div className='mapBox'>
                <Map center={ initialPosition } zoom={15} onClick={ clickedOnMap } >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={ selectedPosition } />
                </Map>

                { ( incompleteForm && selectedPosition[0] === 0 ) && 
                    <FillErrorMessage>*Selecione o ponto no mapa.</FillErrorMessage>
                }
            </div>
            
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
        </fieldset>
    )
};

export default PointAddress;