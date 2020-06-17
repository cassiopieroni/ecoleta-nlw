import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';
import Items from '../../components/Items';
import PointContact from '../../components/PointContact';

import { withItemsData } from '../../hocs/withItemsData';

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

interface Props {
    itemsData: Item[];
}

const Point = (props: Props) => {

    const allItems = props.itemsData;

    const { id } = useParams();

    const [data, setData] = useState<Data>();

    const [pointItems, setPointItems] = useState<Item[]>([]);


    useEffect( () => {

        api.get(`/points/${id}`).then( res => {
            setData(res.data);
        })
    }, [id]);   


    useEffect( () => {

        if (data && data.items && allItems.length) {
            
            const itemsIds = data.items.map( item => item.id);
            const newPointItems = allItems.filter( item => itemsIds.includes(item.id))
            setPointItems(newPointItems);
        }
    }, [data, allItems])

    
    if (!data) {
        return <span>Carregando...</span>
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

                    <Items
                        items={ pointItems }
                        size='small'
                        selectedItems={ pointItems.map( item => item.id)}
                    />

                </div>

                <PointContact point={ point } />

            </main>


        </div>
    )
}

export default withItemsData(Point);