import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';


interface Props {
    to: string;
}


const DefaultLink: React.FC<Props> = ({ to, children }) => (
    
    <Link to={ to } className='defaultLink'>
        { children }
    </Link>
);

export default DefaultLink;