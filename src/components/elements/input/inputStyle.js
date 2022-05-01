import styled, { css } from 'styled-components'

export const InputStyled = styled.div`
    .inputContainer {
        width: 280px;
        height: 38px;
        background: #FCFCFD;
        border: 1px solid #E6E8EC;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 5px 14px;
        transition: 0.2s;
        input {
            width: 100%;
            height: 100%;
            border-radius: inherit;
            border: none;
            outline: none;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            /* display: flex;
            align-items: center; */
            color: #353945;
            background: none;
            &::placeholder {
                color: #777E91;
            }
            &:disabled {
                background: none;
            }
        }
        /* &:hover {
            border: 1px solid #45B36B;
        } */
        ${({img}) => img && css`
            display: flex;
            justify-content: space-between;
            img {
                cursor: pointer;
            }
        `}
        ${({checked}) => checked && css`
            display: flex;
            justify-content: space-between;
        `}
        ${({focused}) => focused && css`
            /* border: 1px solid #777E91; */
            border: 1px solid #45B36B;
        `}
        ${({valid}) => valid && css`
            border: 1px solid #45B36B;
        `}
        ${({error}) => error && css`
            border: 1px solid #EF466F;
        `}
        ${({disabled}) => disabled && css`
            border: 1px solid #E6E8EC;
            input {
                color: #B1B5C4;
            }
        `}
    }
    p {
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
        color: #EF466F;
        display: flex;
        align-items: center;
        margin: 5px 0 0 0px;
        img {
            margin: 0 5px;
        }
    }
    ${({theme:{mode}}) => mode == 'dark' && css`
        .inputContainer {
            background: #141416;
            border: 1px solid #353945;
            input {
                background: none;
                color: #B1B5C4;
            }
        }
    `}
    ${({theme:{mode}, focused}) => mode == 'dark' && focused && css`
        .inputContainer {
            border: 1px solid #E6E8EC;
        }
    `}
    ${({theme:{mode}, valid}) => mode == 'dark' && valid && css`
        .inputContainer {
            border: 1px solid #45B36B;
        }
    `}
    ${({theme:{mode}, error}) => mode == 'dark' && error && css`
        .inputContainer {
            border: 1px solid #EF466F;
        }
    `}
    ${({theme:{mode}, disabled}) => mode == 'dark' && disabled && css`
        .inputContainer {
            border: 1px solid #353945;
            input {
                color: #B1B5C4;
            }
        }
    `}
`;