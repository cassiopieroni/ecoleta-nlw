import styled from 'styled-components';
import { DIVS_PAGES, DIVS_PAGES_CONTAINER } from '../../components/SharedStyles/PagesStyles';
import { FORMS_PRIMARY } from '../../components/SharedStyles/FormsStyles';


export const DIV_PAGE = styled(DIVS_PAGES)``;


export const DIV_CONTAINER = styled(DIVS_PAGES_CONTAINER)``;


export const FORM = styled(FORMS_PRIMARY)``;


export const DIV_RESPONSE_API = styled.div`
   
    width: 100%;
    margin: 24px auto;

        ul {
            margin: 24px auto;
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-wrap: wrap;
        }

        span {
            width: 100%;
            padding: 24px;
            font-size: 1.1rem;
            font-style: italic;
            background-color: #E1FAEC;
            color: var(--text-color);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
        }
`;