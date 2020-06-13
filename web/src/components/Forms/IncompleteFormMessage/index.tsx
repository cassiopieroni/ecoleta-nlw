import React from 'react';

import './styles.css';

const IncompleteFormMessage: React.FC = ({ children }) => (
    <span className="fillError">
        { children }
    </span>
);

export default IncompleteFormMessage;