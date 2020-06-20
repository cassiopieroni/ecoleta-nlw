import styled from 'styled-components';

export const FORMS_PRIMARY = styled.form`

    display: flex;
    flex-direction: column;


        fieldset {
            margin-top: 64px;
            min-inline-size: auto;
            border: 0;
        }

        fieldset legend {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
        }

        fieldset legend h2 {
            font-size: 1.5rem;
        }

        fieldset legend span {
            font-size: .9rem;
            font-weight: normal;
            color: var(--text-color);
            margin-left: 8px;
        }
`;


export const DIV_FIELD_GROUPS = styled.div`

    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

        input + input {
            margin-left: 24px;
        }
`;


export const DIV_FIELDS = styled.div`

    flex: 1; 
    display: flex;
    flex-direction: column;
    margin: 0 8px 24px 8px;


        input[type=text], 
        input[type=email], 
        input[type=number] {
            background: #F0F0F5;
            border-radius: 8px;
            padding: 16px 24px;
            font-size: 16px;
            color: #6C6C80;
        }

        label {
            font-size: 14px;
            margin-bottom: 8px;
        }


        &:disabled {
            cursor: not-allowed;
        }
`;