import styled from 'styled-components';


export const DIV = styled.div`

    margin: 32px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const DIV_CONTACT = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0;


    @media(max-width: 600px) {
        margin-top: 8px;
        flex-direction: column;
	}
`;


export const DIV_CONTACT_INFOS = styled.div`

    width: 45%;
    margin: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;


        div {
            margin: 8px 8px 8px 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        div p {
            width: 100%;
            text-align: right;
            margin-left: 8px;
        }
    
    
    @media(max-width: 600px) {
		width: 100%;
		align-items: center;
		margin-bottom: 24px;
	}
`;


export const DIV_MAP = styled.div`

    width: 55%;
    min-width: 250px;
    height: 200px;
    max-height: 200px;
`;