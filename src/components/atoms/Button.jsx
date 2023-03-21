import React from 'react';
import styled from 'styled-components';
import { shade } from 'polished';

const Button = ({ children, loading, ...rest }) => (
    <Container type="button" {...rest}>
        {loading ? 'Carregando...' : children}
    </Container>
);

const Container = styled.button`
    background: #000;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 1rem;
    color: #fff;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;

    &:hover {
        background: ${shade(0.2, '#000000')};
    }
`;

export default Button;