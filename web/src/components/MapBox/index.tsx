import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import './styles.css';

interface Props {
    initialPosition: [number, number];
    selectedPosition: [number, number];
    clickedOnMap: (event: LeafletMouseEvent) => void;
}


const MapBox: React.FC<Props> = ({ initialPosition, selectedPosition, clickedOnMap }) => {

    return (

        <Map center={ initialPosition } zoom={15} onClick={ clickedOnMap } >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={ selectedPosition } />
        </Map>
    )
}

export default MapBox;