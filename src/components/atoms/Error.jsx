import styled from 'styled-components';
import Tooltip from './Tooltip';

const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 8.8rem;

    svg {
        margin: 0;
    }

    span {
        background: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent;
        }
    }
`;

export default Error;