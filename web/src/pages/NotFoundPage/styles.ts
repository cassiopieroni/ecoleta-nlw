import styled from 'styled-components';
import { DIVS_PAGES, DIVS_PAGES_CONTAINER } from '../../components/SharedStyles/PagesStyles';


export const DIV_PAGE = styled(DIVS_PAGES)``;


export const DIV_CONTAINER = styled(DIVS_PAGES_CONTAINER)`

    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 4rem;
    }

    span {
        margin: 16px;
        font-size: 1.5rem;
    }
`;
