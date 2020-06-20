import React from 'react';

import { LI } from './styles';

interface Props {
    item: {
        id: number;
        image_url: string;
        title: string;
    }
    isSelected?: boolean;
    onSelected?: (id: number) => void;
    size?: string;
}

const Item: React.FC<Props> = ({ item, isSelected, onSelected, size }) => {

    const clicked = () => onSelected ? onSelected(item.id) : null;

    
    return (

        <LI 
            onClick={ clicked } 
            isSelected={ isSelected ? true : false } 
            isSmall={ (size && size === 'small') ? true : false } 
            isClickable={ (onSelected) ? true: false } 
        >
            
            <img src={ item.image_url } alt={ item.title }/>
            <span>{ item.title }</span>
        
        </LI>
    )
} 

export default Item;