import styled from 'styled-components';
import { DIVS_PAGES, DIVS_PAGES_CONTAINER } from '../../components/SharedStyles/PagesStyles';
import { FORMS_PRIMARY } from '../../components/SharedStyles/FormsStyles';


export const DIV_PAGE = styled(DIVS_PAGES)``;


export const DIV_CONTAINER = styled(DIVS_PAGES_CONTAINER)``;


export const FORM = styled(FORMS_PRIMARY)`

    div button {
        width: 260px;
        height: 56px;
        background: var(--primary-color);
        border-radius: 8px;
        color: #FFF;
        font-weight: bold;
        font-size: 16px;
        border: 0;
        align-self: flex-end;
        margin-top: 40px;
        transition: background-color 0.2s;
        cursor: pointer;

        &:hover {
            background: #2FB86E;
        }
    }
`;
