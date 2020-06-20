import styled from 'styled-components';

export const DIV = styled.div`

    width: 100%;
    max-width: 360px;
    height: 72px;
    margin: 40px auto 24px;
    background: var(--primary-color);
    border-radius: 8px;
    border: none;

    a {
        width: 100%;
        height: 72px;
        text-decoration: none;
        border-radius: 8px;
        display: flex;
        align-items: center;
        overflow: hidden;

        &:hover {
            background: #2FB86E;
        }
    }

    a span {
        display: block;
        background: rgba(0, 0, 0, 0.08);
        width: 72px;
        height: 72px;
    
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;

        @media(max-width: 600px) {
            display: none;
        }
    }

    a span svg {
        color: #FFF;
        width: 20px;
        height: 20px;
    }

    a strong {
        flex: 1;
        text-align: center;
        color: #FFF;
    }
`;