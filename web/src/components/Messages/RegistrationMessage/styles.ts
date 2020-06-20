import styled from 'styled-components';


export const DIV = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-color: rgba(108, 108, 128, .9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;


export const DIV_MESSAGE_BOX = styled.div`

    background-color: #ffffff;
    width: 400px;
    min-height: 300px;
    border-radius: 10px;


        h2 {
            margin: 20px auto;
            text-align: center;
        }

        div {
            margin: 20px auto;
            width: 80%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        div svg {
            margin-bottom: 15px;
        }

        div p {
            color: var(--text-color);
            font-size: 1.1rem;
            line-height: 1.5;
            text-align: center;
        }

        div a svg {
            margin-top: 15px;
        }
`;

