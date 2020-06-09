import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface Props {
    to: string;
    size?: string;
}

const DefaultLink: React.FC<Props> = ({ to, children, size }) => {

    const classStyle = size ? `defaultLink ${size}` : 'defaultLink'; 

    return (
        <Link to={ to } className={classStyle} >
            { children }
        </Link>
    )
};

export default DefaultLink;