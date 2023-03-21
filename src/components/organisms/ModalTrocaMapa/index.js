import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Satelite from 'assets/images/Elipse 430.svg'
import Relevo from 'assets/images/Relevo.svg'

const Background = styled.div`
 /*  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); */

 /*  display: flex; */
  /* justify-content: center;
  align-items: center; */
  z-index: 10;
  position: absolute;
  width: 280px;
 // height: 300px;
  top: 18vh;
  right: 6rem;
  
`;

const ModalWrapper = styled.div`
 width: 100%;
height: 100%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background:#212223 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
border-radius:17px;
opacity: 1;
  color: #fff;
  padding-top:2rem;
 /*  position: absolute;
  z-index: 9;
  top: 10px;
  right: 5px; */
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //line-height: 1.8;
  color: #fff;
  h3{
    color:#fff;
    font-weight: bold;
  }
 /*  p {
    margin-bottom: 1rem;
  } */
 /*  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  } */
  ul{
    display: flex;
    align-items: center;
    list-style-type: none;
    li{
      text-align: center;
      .active{
        //border: solid #F0B90B 2px;
        
      }
     button{
       
      border: none;
      background: none;
      cursor: pointer;
transition:0.3s;
&:hover{

transform:scale(1.05);
}

      img{
        width: 100%;
      }
     }
      
    }
  }
`;

const CloseModalButton = styled.button`
border: 0;
  cursor: pointer;
  position: absolute;
  top: 7.3rem;
  right: -3.4rem;
  padding: 0;
  z-index: 999;
  /* css */
  background: none;
height: 100px;
-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  z-index:1;
  svg{
    width: 100%;
  }
`;


function Index({ showModal, setShowModal }) {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    //transform: showModal ? `translateX(0%)` : `translateX(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        // console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
       {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              
              <ModalContent>
                <h3>Troca de mapa</h3>
                <ul>
                 <li>
                   <button className="active"><img src={Satelite} alt="" /></button>
                   <p>Satelite</p>
                 </li>
                 <li>
                 <button>
                 <img src={Relevo} alt="" />
                 </button>
                 <p>Relevo</p>
                 </li>
                 
               </ul>
                
              </ModalContent>
              
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              >
              </CloseModalButton>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  )
}

export default Index
