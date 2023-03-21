import { useEffect, useRef, useState } from 'react';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import { notification } from 'antd';
import 'antd/dist/antd.css';

import ConfirmSignIn from 'components/organisms/ConfirmSignin';
import SignIn from 'components/organisms/Signin';
import { usePasswordless } from "services/auth";

const AuthState = {
    SIGNEDOUT: 'signedOut',
    CHALLENGED: 'challenged'
};

const Login = ({ awsconfig }) => {
    const [authState, setAuthState] = useState(null);
    const session = useRef(null);
    const { setToken } = usePasswordless();
    
    useEffect(() => {
        Amplify.configure(awsconfig);
        Auth.currentAuthenticatedUser()
            .then((cognitoUser) => {
                setToken(cognitoUser.signInUserSession.idToken.jwtToken);
            })
            .catch((err) => {
                setAuthState(AuthState.SIGNEDOUT);
       });
    }, [awsconfig]);

    const handleSignIn = (phoneNumber) => {
        Auth.signIn(phoneNumber)
            .then((result) => {
                session.current = result;
                setAuthState(AuthState.CHALLENGED);
            })
            .catch((err) => {
                switch (err.code) {
                    case 'UserNotFoundException':
                        openNotification('Celular não encontrado', 'Informe um número previamente cadastrado junto ao Instituto Cerrados ')
                        break;
                    default:
                        openNotification('Celular inválido', 'Informe um número previamente cadastrado junto ao Instituto Cerrados ')
                        break;
                }
            });
    };

    const handleConfirmSignIn = (code) => {
        Auth.sendCustomChallengeAnswer(session.current, code)
            .then((cognitoUser) => {
                Auth.currentAuthenticatedUser()
                    .then((cognitoUser) => {
                        setToken(cognitoUser.signInUserSession.idToken.jwtToken);
                    })
                    .catch((err) => {
                        openNotification('Código de acesso inválido', 'Informe o código recebido via SMS.')
                });
            })
            .catch((err) => {
                switch (err.code) {
                    case 'NotAuthorizedException':
                        openNotification('Muitas tentativas inválidas.', 'Reiniciando o processo de autenticação.')
                        setAuthState(AuthState.SIGNEDOUT);        
                        break;
                    default:
                        openNotification('Código de acesso inválido.', 'Informe o código recebido via SMS.')
                        break;
                }
            });
    };

    const openNotification = (message, description) => {
        notification.error({
            message: message,
            description: description,
            style:{
                background: '#fddede',
                borderRadius: '10px'
            }
        });
    };
    
    return (
        <>
            {authState===AuthState.SIGNEDOUT && (
                <SignIn onSubmit={handleSignIn} />
            )}
            {authState===AuthState.CHALLENGED && (
                <ConfirmSignIn onSubmit={handleConfirmSignIn} />
            )}
        </>
    );
}

export default Login;
