import styled, { StyledProps } from 'styled-components';


type Props = StyledProps<{
    isSelected?: boolean;
    isSmall?: boolean;
    isClickable?: boolean;
}>;

export const LI = styled.li(
    (props: Props) => `

        background: ${ props.isSelected ? '#E1FAEC' : '#f5f5f5' };
        border: 2px solid ${ props.isSelected ? '#34CB79' : '#f5f5f5' };
    
        cursor: ${ props.isClickable ? 'pointer' : 'default' };
    
        width: ${ props.isSmall ? '85px' : '180px' };
        padding: ${ props.isSmall ? '16px' : '32px 24px 16px' };
        margin: ${ props.isSmall ? '4px' : '8px' };
        height: ${ props.isSmall ? '120px' : '180px' };

        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;


            img {
                width: ${ props.isSmall ? '35px' : 'default' };
                height: ${ props.isSmall ? '35px' : 'default' };
            }

            span {
                font-size: ${ props.isSmall ? '.8rem' : '1rem' };
                margin-top: ${ props.isSmall ? '8px' : '12px' };

                flex: 1;
                display: flex;
                align-items: center;
                color: var(--title-color)
            }
    `
);