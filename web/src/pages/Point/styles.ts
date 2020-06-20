import styled from 'styled-components';
import { DIVS_PAGES, DIVS_PAGES_CONTAINER } from '../../components/SharedStyles/PagesStyles';


export const DIV_PAGE = styled(DIVS_PAGES)``;


export const DIV_CONTAINER = styled(DIVS_PAGES_CONTAINER)`
    
    display: flex;
    flex-direction: column;
    
        h1 {
            margin-bottom: 32px;
        }

        h2 {
            text-align: center;
        }

        img {
            width: 100%;
            margin-bottom: 32px;
        }
`;


export const DIV = styled.div`

    margin: 32px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;


