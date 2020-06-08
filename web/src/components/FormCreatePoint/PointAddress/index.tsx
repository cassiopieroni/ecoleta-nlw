import React, { ChangeEvent } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

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


    return (

        <fieldset className='layout-fieldset'>
            <legend>
                <h2>Endereço</h2>
                <span>Selecione o endereço no mapa</span>
            </legend>

            <Map center={ initialPosition } zoom={15} onClick={ clickedOnMap } >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={ selectedPosition } />
            </Map>
            
            <div className="field-group">
                
                <div className="field">
                    <label htmlFor="uf">Estado (UF)</label>
                    <select 
                        name="uf" 
                        id="uf" 
                        onChange={ changeAddress } 
                        value={ selectedUf }
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