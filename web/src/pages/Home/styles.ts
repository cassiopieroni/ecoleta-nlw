import styled from 'styled-components';


export const DIV_PAGE_HOME = styled.div`
    
    height: 100vh;
`;


export const DIV_CONTENT = styled.div`

    width: 100%;
    height: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 30px;
  
    display: flex;
    flex-direction: column;
    align-items: flex-start;

        main {
            flex: 1;
            max-width: 1060px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        main div:first-child {
            width: 55%;
        }

        main h1 {
            font-size: 54px;
            color: var(--title-color);
        }

        main p {
            font-size: 24px;
            margin-top: 24px;
            line-height: 38px;
        }


    @media(max-width: 900px) {

        align-items: center;
        text-align: center;

            main {
                align-items: center;
            }
            main h1 {
                font-size: 42px;
            }
            main p {
                font-size: 24px;
            }
    }
`;


export const DIV_IMAGE_BOX = styled.div`

    width: 45%;
    max-width: 700px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

        img {
            width: 100%;
        }

    @media(max-width: 900px) {
        display: none;
    }
`;

