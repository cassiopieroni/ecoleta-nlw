import React from 'react';
import { Link } from 'react-router-dom';

import { DIV } from './styles'

interface Props {
    to: string;
}

const SecondaryLink: React.FC<Props> = ({ to, children }) => (

    <DIV>
        <Link to={ to }>
            { children }
        </Link>
    </DIV>
);

export default SecondaryLink;