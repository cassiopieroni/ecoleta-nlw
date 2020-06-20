import styled from 'styled-components';

export const HEADER = styled.header`

    width: 100%;
    margin: 48px 0 0;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        cursor: pointer;
    }

    @media(max-width: 900px) {
        margin: 48px auto 0;
    }
`;