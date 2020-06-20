import React from 'react';

import { LI } from './styles';

interface Props {
    clicked: (id: number) => void;
    point: {
        id: number;
        email: string;
        image_url: string;
        name: string;
        whatsapp: string;
    }
}


const PointCard: React.FC<Props> = ({ point, clicked }) => {

    const { id, email, image_url, name, whatsapp } = point;

    
    return (

        <LI onClick={ () => clicked(id)}>
            <img src={ image_url } alt={ name } />
            <h2>{ name }</h2>
            <p>{ email }</p>
            <p>Tel: { whatsapp }</p>
        </LI>
    )
}

export default PointCard;