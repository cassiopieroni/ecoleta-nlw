import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface Props {
    to: string;
}

const ButtonLink: React.FC<Props> = ({ to, children }) => (

    <button className='buttonLink'>
        <Link to={ to }>
            { children }
        </Link>
    </button>
);

export default ButtonLink;