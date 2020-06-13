import React, { useContext } from 'react';

import { IncompleteFieldsOnFormContext } from '../../../pages/CreatePoint';

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
    size?: string;
}


const PointItems: React.FC<Props> = ({ items, onSelected, selectedItems, size }) => {

    const incompleteForm = useContext( IncompleteFieldsOnFormContext);

    const isError = (incompleteForm && !selectedItems.length) ? 'isError' : '';
    const classItems = (size === 'small') ? 'items-grid small' : 'items-grid';

    return (

        <fieldset className='layout-fieldset'>
            <legend>
                <h2>itens de coleta</h2>
                <span className={ isError }>Selecione um ou mais items abaixo</span>
            </legend>
                
                <ul className={ classItems }>
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
}

export default PointItems;