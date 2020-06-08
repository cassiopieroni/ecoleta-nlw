import React from 'react';

import '../sharedStyles.css';
import './styles.css';


interface Props {
    onSelected: (id: number) => void;
    items: {
        id: number;
        title: string;
        image_url: string;
    }[];
    selectedItems: number[];
}


const PointItems: React.FC<Props> = ({ items, onSelected, selectedItems }) => (

    <fieldset className='layout-fieldset'>
        <legend>
            <h2>itens de coleta</h2>
            <span>Selecione um ou mais items abaixo</span>
        </legend>
            
            <ul className="items-grid">
                { items.map( item => (
                    <li 
                        key={ item.id } 
                        onClick={ () => onSelected(item.id) } 
                        className={ selectedItems.includes(item.id) ? 'selected' : '' }    
                    >
                        <img src={ item.image_url } alt={ item.title }/>
                        <span>{ item.title }</span>
                    </li>
                ))}   
            </ul>
        
    </fieldset>
);

export default PointItems;