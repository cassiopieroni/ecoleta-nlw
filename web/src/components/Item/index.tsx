import React from 'react';

import './styles.css';


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

    let classStyle = 'collectItem';
        if (isSelected) classStyle += ' selected';
        if (size === 'small') classStyle += ' smallItem';
        if (onSelected) classStyle += ' pointer';

        
    return (

        <li 
            key={ item.id } 
            onClick={ clicked }
            className={ classStyle }
        >
            <img src={ item.image_url } alt={ item.title }/>
            <span>{ item.title }</span>
        </li>
    )
} 

export default Item;