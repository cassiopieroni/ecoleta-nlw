import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import { FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import Header from '../../components/Header';
import MapBox from '../../components/MapBox';
import Item from '../../components/Item';

import './styles.css';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface Data {
    point: {
        id: number;
        name: string;
        email: string;
        whatsapp: string;
        latitude: number;
        longitude: number;
        city: string;
        uf: string;
        image_url: string;
        },
    items: { id: number }[];
}

const Point = () => {

    const { id } = useParams();

    const [data, setData] = useState<Data>();

    const [allItems, setAllItems] = useState<Item[]>([]);

    const [pointItems, setPointItems] = useState<Item[]>([]);


    useEffect( () => {
        api.get(`/points/${id}`).then( res => {
            setData(res.data);
        })
    }, []);

    useEffect( () => {

        api.get('items').then( res => {
            setAllItems(res.data)
        })
    }, []);

    useEffect( () => {

        if (data && data.items && allItems.length) {
            const itemsIds = data.items.map( item => item.id);
            const newPointItems = allItems.filter( item => itemsIds.includes(item.id))
            setPointItems(newPointItems);
        }
    }, [data, allItems])

    
    if (!data) {
        return (
            <span>Carregando...</span>
        )
    }


    const { point } = data;

    return (
        <div id='page-point' >

            <Header />

            <main>
                <h1>{ point.name }</h1>
                <img className='point-image' src={ point.image_url } alt={ point.name }/>

                <div className="point-items">

                    <h2>Items de coleta</h2>

                    <ul className="items-content">
                        { pointItems.map( item => (
                            <Item item={ item } size='small' isSelected={ true } />
                        ))}
                    </ul>
                </div>

                <div className='contact'>

                    <h2>Contato</h2>

                    <div className="contact-content">

                        <div className='contact-infos' >
                            <div>
                                <FiMail />
                                <p>{point.email}</p>
                            </div>
                            <div>
                                <FaWhatsapp />
                                <p>{point.whatsapp}</p>
                            </div>
                            <div>
                                <FaMapMarkerAlt />
                                <p>{`${point.city}, ${point.uf}`}</p>
                            </div>
                        </div>

                        <div className='map'>
                            <MapBox 
                                initialPosition={ [point.latitude, point.longitude] } 
                                selectedPosition={ [point.latitude, point.longitude] } 
                            />
                        </div>
                    
                    </div>
                
                </div>
            </main>


        </div>
    )
}

export default Point;