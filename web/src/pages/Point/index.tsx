import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';
import Items from '../../components/Items';
import PointContact from '../../components/PointContact';

import { withItemsData } from '../../hocs/withItemsData';

import { DIV_PAGE, DIV_CONTAINER, DIV } from './styles';


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

        <DIV_PAGE>

            <Header />

            <DIV_CONTAINER>

                <h1>{ point.name }</h1>
                
                <img src={ point.image_url } alt={ point.name }/>

                <DIV>

                    <h2>Items de coleta</h2>

                    <Items
                        items={ pointItems }
                        size='small'
                        selectedItems={ pointItems.map( item => item.id)}
                    />

                </DIV>

                <PointContact point={ point } />

            </DIV_CONTAINER>


        </DIV_PAGE>
    )
}

export default withItemsData(Point);