import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import Tootipleft from '../../../assets/images/tootipleft.svg';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  width: 450px;
  padding: 1.5rem;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #212223 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 0 17px 17px 0;
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 9;
  border-radius: 10px;
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const ModalContent = styled.div`
  a {
    margin: 2rem 0;
    width: 100%;
    padding: 16px 20px;
    background: #141414;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-weight: bold;
  }

  ul {
    list-style-type: none;
    li {
      h2 {
        font-size: 200;
        color: #000;
        font-size: 16px;
        font-size: bold;
        margin-bottom: -1px;
      }
      p {
        font-size: normal;
        font-size: 14px;
        color: #707070;
      }
      margin-top: -6px;
      /*  & + li {
            margin-top: -5px;
            } */
    }
  }
`;

export const ModalHead = styled.div`
  h1 {
    color: #d59900;
    font-size: 1.5rem;
    font-weight: bold;
  }
  p {
    font-size: normal;
    font-size: 14px;
    color: #707070;
  }
`;

export const ModalFooter = styled.div`
  button {
    width: 100%;
    padding: 20px 24px;
    background: #141414;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-weight: bold;
  }
`;

function Modal({
  showModal,
  setShowModal,
  content,
  hasLine,
  sethasLine,
  target
}) {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(prev => !prev);
      sethasLine(false)
      target(null);
    }
  };

  const drawLineClicked = () =>{
    
    setShowModal(prev => !prev);
    target(content.center)
    sethasLine(true);
  };

  const eraseLineClicked = () =>{
  
    setShowModal(false);
      sethasLine(false);
      target(null);

  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      sethasLine(false)
      target(null)
      }
    },
        
        [setShowModal, showModal,target,sethasLine],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background showModal={showModal} onHide={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <img className="tootipleft" src={Tootipleft} alt="" />
              <ModalHead>
                <h1>{content.layer_name}</h1>
                <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => closeModal}
                />
              </ModalHead>
              <ModalContent>
                <ul>
                  {content.props.map((item, index) => (
                    <li key={index}>
                      <h2>{item.key}</h2> <p>{item.value}</p>
                    </li>
                  ))}
                </ul>
              </ModalContent>
              <ModalFooter>
              { content.erase_line && <button onClick={eraseLineClicked} >Remover direção</button>}
               { content.footer && !content.erase_line &&  <button onClick={drawLineClicked} >Direção até aqui</button>}
              </ModalFooter>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
}

export default Modal;
