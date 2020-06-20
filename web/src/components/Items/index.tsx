import React from 'react';
import Item from '../Item';

import { UL } from './styles';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface Props {
    onSelected?: (id: number) => void;
    items: Item[];
    selectedItems?: number[];
    size?: string;
}


const Items: React.FC<Props> = ({ onSelected, items, selectedItems, size }) => (

    <UL>
        { items.map( item => (

            <Item 
                key={ item.id }
                item={ item }
                onSelected={ onSelected }
                isSelected={ (selectedItems) && selectedItems.includes(item.id) ? true : false }
                size={ (size) && size }
            />
        ))}   
    </UL>
);

export default Items;