import React from 'react';

import './styles.css';

interface Props {
    point: {
        email: string;
        image_url: string;
        name: string;
        whatsapp: string;
    }
}

const CollectPoint: React.FC<Props> = ({ point }) => {

    const { email, image_url, name, whatsapp } = point;

    return (
        <li className='collectPoint'>
            <img src={ image_url } alt={ name } />
            <h2>{ name }</h2>
            <p>{ email }</p>
            <p>Tel: { whatsapp }</p>
        </li>
    )
}

export default CollectPoint;