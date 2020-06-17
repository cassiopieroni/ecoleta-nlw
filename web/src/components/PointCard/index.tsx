import React from 'react';

import './styles.css';

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
        <li className='pointCard' onClick={ () => clicked(id)}>
            <img src={ image_url } alt={ name } />
            <h2>{ name }</h2>
            <p>{ email }</p>
            <p>Tel: { whatsapp }</p>
        </li>
    )
}

export default PointCard;