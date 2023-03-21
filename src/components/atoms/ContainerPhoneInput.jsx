import styled, { css } from 'styled-components';

const ContainerPhoneInput = styled.div`
    background: #F4F4F4;
    border-radius: 5px;
    padding: 1rem;
    width: 100%;
    border: 2px solid #F4F4F4;
    color: #212223;
    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    ${(props) =>
        props.isErrored &&
        css`
            border-color: #c53030;
    `}

    ${(props) =>
        props.isFocused &&
        css`
            color: #ff9000;
            border-color: #ff9000;
    `}

    ${(props) =>
        props.isFilled &&
        css`
            color: #ff9000;
    `}

    input {
        background: transparent;
        border: 0;
        color: #000;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;

        &::placeholder {
            color: #000000;
            opacity: 0.3;
        }
    }

    svg {
        margin-right: 16px;
    }
`;

export default ContainerPhoneInput;