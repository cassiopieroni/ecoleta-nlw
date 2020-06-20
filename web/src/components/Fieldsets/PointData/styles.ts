import styled, { StyledProps } from 'styled-components';
import { DIV_FIELDS, DIV_FIELD_GROUPS } from '../../SharedStyles/FormsStyles';


export const DIV_FIELD_GROUP = styled(DIV_FIELD_GROUPS)``;


type Props = StyledProps<{
    isFillingError?: boolean;
}>;

export const DIV_FIELD = styled(DIV_FIELDS)(
    
    (props: Props) => `

        input {
            border: ${ props.isFillingError ? '2px solid red' : 'none' };
        }
    `
);