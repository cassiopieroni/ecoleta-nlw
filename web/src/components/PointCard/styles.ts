import styled from 'styled-components';

export const LI = styled.li`

    min-width: 250px;
    max-width: 250px;
    margin: 16px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    background-color: #E1FAEC;
    border-radius: 8px;
    flex: 1;
    padding-bottom: 8px;


        img {
            border-radius: 8px 8px 0 0;
            width: 250px;
            height: 100%;
            min-height: 200px;
        }

        h2 {
            font-size: 1.1rem;
            text-align: center;
            width: 100%;
            color: var(--title-color);
            margin: 4px auto;
            padding: 8px 0;
        }

        p {
            text-align: center;
            width: 100%;
            color: var(--text-color);
            margin: 4px auto;
            padding: 0 4px;
        }
`;