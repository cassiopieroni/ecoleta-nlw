import React from 'react';

import './styles.css';

const FillErrorMessage: React.FC = ({ children }) => (
    <p className="fillError">
        { children }
    </p>
);

export default FillErrorMessage;