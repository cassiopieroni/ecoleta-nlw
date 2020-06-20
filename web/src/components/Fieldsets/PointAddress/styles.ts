import styled, { StyledProps } from 'styled-components';
import { DIV_FIELDS, DIV_FIELD_GROUPS } from '../../SharedStyles/FormsStyles';


export const DIV = styled.div`

    margin-bottom: 24px;
`;


export const DIV_FIELD_GROUP = styled(DIV_FIELD_GROUPS)``;


type Props = StyledProps<{
    isFillingError?: boolean;
}>;

export const DIV_FIELD = styled(DIV_FIELDS)(
    
    (props: Props) => `
        select {
            border: ${ props.isFillingError ? '2px solid red' : 'none' };
            appearance: none;
            flex: 1;
            background: #F0F0F5;
            border-radius: 8px;
            padding: 16px 24px;
            font-size: 16px;
            color: #6C6C80;
        }

        input::placeholder {
            color: #A0A0B2;
        }
`
);