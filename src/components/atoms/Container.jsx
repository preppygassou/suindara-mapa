import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
    background-color: #CF8121;
    @media screen and (max-width:600px) {
        background-color:#fff;
    }
`;

export default Container;