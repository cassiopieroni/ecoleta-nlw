import React, { useContext } from 'react';

import { IncompleteFieldsOnFormContext } from '../../../pages/CreatePoint';

import Item from '../../Item';

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

    const red = (incompleteForm && !selectedItems.length) ? 'isError' : '';
    const classItems = (size === 'small') ? 'items-grid small' : 'items-grid';

    return (

        <fieldset className='layout-fieldset'>
            <legend>
                <h2>itens de coleta</h2>
                <span className={ red }>Selecione um ou mais items abaixo</span>
            </legend>
                
                <ul className={ classItems }>
                    { items.map( item => (
                        <Item 
                            key={ item.id }
                            item={ item }
                            onSelected={ onSelected }
                            isSelected={ selectedItems.includes(item.id) ? true : false }
                            size={ (size) && size }
                        />
                    ))}   
                </ul>
            
        </fieldset>
    );
}

export default PointItems;