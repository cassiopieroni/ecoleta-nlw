import React, { useState, useEffect, ComponentType } from "react";
import api from '../../services/api';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface Data {
    items: Item[];
}

export function withItemsData<P>(WrappedComponent: ComponentType<P & Data>) {

    const ComponentWithItemsData: React.FC<P & Data> = (props) => {
        
        const [items, setItems] = useState<Item[]>([])

        useEffect(() => {
            api.get('items').then( res => {
                setItems(res.data)
            });
        }, []);

        return <WrappedComponent  {...props} itemsData={ items } />
    };

    return ComponentWithItemsData;
}