import { useCallback, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import PhoneInput, {isPossiblePhoneNumber} from 'react-phone-number-input/'
import { AnimationContainer, Background, Button, Container, Content, ContainerPhoneInput, Error } from 'components/atoms';
import logoImg from 'assets/images/logo.svg';

const SignIn = ({ onSubmit }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [isPossible, setIsPossible] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputError = useCallback(() => {
        phoneNumber && !!isPossiblePhoneNumber(phoneNumber) ? setIsPossible(true) : setIsPossible(true)
    }, [phoneNumber]);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!useRef.current?.value);
    }, []);

    const handleSignIn = () => {    
        onSubmit( phoneNumber )
    }

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img className="logo" src={logoImg} alt="Suindara IC" />
                    <div className="form">
                        <h1>Entrar no sistema</h1>   
                        <p>
                            Digite o número de seu celular,
                            conforme registrado previamente no Sistema Suindara,
                            e enviaremos um código de acesso via SMS.
                        </p>
                        <ContainerPhoneInput
                            /*isErrored={!!error}*/
                            isFilled={isFilled}
                            isFocused={isFocused}
                            data-testid="input-container"                   
                        >
                            <PhoneInput
                                name="phoneNumber"
                                international
                                defaultCountry="BR"
                                onChange={ setPhoneNumber}
                                value={phoneNumber}
                                placeholder="61999999999"
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                /* ref={useRef} */
                                error={handleInputError}
                            />
                            {isPossible && (
                                <Error title={"Número de celular invalido"}>
                                    <FiAlertCircle color="#c53030" size={20} />
                                </Error>
                            )}
                        </ContainerPhoneInput>
                        <Button 
                            type="submit"
                            onClick={handleSignIn}
                        >
                            Solicitar código de acesso
                        </Button> 
                    </div>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
}

export default SignIn;