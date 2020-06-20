import styled from 'styled-components';

export const DIV = styled.div`

    a {
        color: var(--title-color);
        font-weight: bold;
        text-decoration: none;

        display: flex;
        align-items: center;
        margin: 16px;
    }

    a svg {
        margin-right: 16px;
        color: var(--primary-color);
    }
`;