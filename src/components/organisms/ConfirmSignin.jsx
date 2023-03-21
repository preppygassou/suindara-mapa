import { useCallback, useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { AnimationContainer, Background, Button, Container, Content, ContainerPhoneInput } from 'components/atoms';
import logoImg from 'assets/images/logo.svg';

const ConfirmSignIn = ({ onSubmit }) => {
    const [code, setCode] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
  
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!useRef.current?.value);
    }, []);
    
    const handleConfirmSignIn = () => {
        onSubmit( code )
    }

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img className="logo" src={logoImg} alt="Suindara IC" />
                    <div className="form">
                        <h1>Complete o Login</h1>   
                        <p>
                            Insira o código de acesso que você recebeu via SMS.
                        </p>
                        <ContainerPhoneInput
                            /*isErrored={!!error}*/
                            isFilled={isFilled}
                            isFocused={isFocused}
                            data-testid="input-container"
                        >
                            <FiLock size={20} />           
                            <input
                                name="code"
                                type="text"
                                onChange={e => setCode(e.target.value)}
                                value={code}
                                placeholder="999999"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                            />
                        </ContainerPhoneInput>
                        <Button 
                            type="submit"
                            onClick={handleConfirmSignIn}
                        >
                            Continuar
                        </Button >
                    </div>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
}

export default ConfirmSignIn;