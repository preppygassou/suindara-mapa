import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform:translateX(-50px);
    }
    to {
        opacity: 1;
        transform:translateX(0);
    }
`;

const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    -webkit-box-shadow: 2px 6px 10px 0px rgba(0,0,0,0.10);
    -moz-box-shadow: 2px 6px 10px 0px rgba(0,0,0,0.10);
    box-shadow: 2px 6px 10px 0px rgba(0,0,0,0.10);
    padding: 4rem 1rem 1rem 1rem;
    border-radius: 10px;
    @media screen and (max-width:600px) {
        grid-template-columns: 1fr;
        box-shadow: none;
    }
    animation: ${appearFromLeft} 1s;

    .logo{
        width: 100px;
    }

    .form {
        margin:2rem ;
        width: 25rem;
        text-align: center;

        h1 {
            margin-bottom: 24px;
            font-size:1.5rem;
            font-weight: bold;
        }

        p {
            font-size: 12px;
            margin-bottom: 24px;
        }

        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover {
            color: ${shade(0.2, '#f4ede8')};
            }
        }
    }

    > a {
        color: #ff9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        align-items: center;
        justify-content: center;

        svg {
            margin-right: 16px;
        }
        &:hover {
            color: ${shade(0.2, '#ff9000')};
        }
    }
`;

export default AnimationContainer;