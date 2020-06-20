import React, { useContext } from 'react';

import { IncompleteFieldsOnFormContext } from '../../../pages/CreatePoint';

import Items from '../../Items';
import TextErrorMessage from '../../Messages/TextErrorMessage';

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


    return (

        <fieldset>
            
            <legend>
                <h2>itens de coleta</h2>
                <span>Selecione um ou mais items abaixo</span>
            </legend>

            <Items 
                items={ items }
                onSelected={ onSelected }
                selectedItems={ selectedItems }
                size={ (size) && size }
            />
            
            { (incompleteForm && !selectedItems.length) && (
                <TextErrorMessage>Selecione os items que este ponto coleta*</TextErrorMessage>
            )}

        </fieldset>
    );
}

export default PointItems;