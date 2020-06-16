import React, { useContext } from 'react';

import { IncompleteFieldsOnFormContext } from '../../../pages/CreatePoint';

import Items from '../../Items';

import '../sharedStyles.css';


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

    const redColorStyle = (incompleteForm && !selectedItems.length) ? 'isError' : '';


    return (

        <fieldset className='layout-fieldset'>
            
            <legend>
                <h2>itens de coleta</h2>
                <span className={ redColorStyle } >Selecione um ou mais items abaixo</span>
            </legend>

            <Items 
                items={ items }
                onSelected={ onSelected }
                selectedItems={ selectedItems }
                size={ (size) && size }
            />
            
        </fieldset>
    );
}

export default PointItems;