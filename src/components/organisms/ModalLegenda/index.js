import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import Calorvermelho  from "assets/images/Grupo 1130.svg"
import Calorlaranja  from "assets/images/Grupo 1129.svg"
import Calorl3  from "assets/images/Grupo 1128.svg"
import Calorl4  from "assets/images/Grupo 1127.svg"
import Calorl5  from "assets/images/Grupo 1126.svg"
import Localisacao from "assets/images/Grupo 1131.svg"
import Desmatamento from "assets/images/Retângulo 1562.svg"
import Território from "assets/images/Retângulo 1563.svg"
import Adjancente from "assets/images/Retângulo 1564.svg"


const Background = styled.div`
 /*  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); */

 /*  display: flex; */
  /* justify-content: center;
  align-items: center; */
  z-index: 9;
  position: relative;
  @media  (max-width: 768px) {
    
   display: none;

}
`;

const ModalWrapper = styled.div`
 width: 280px;
/* height: 401px; */
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background:#212223 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
border-radius:0 17px 17px 0;
/* opacity: 1; */
  color: #fff;
  /* display: grid;
  align-items: center;

  grid-template-columns: 1fr; */
  position: absolute;
  z-index: 9;
  top: 20vh;
  left: 0;
  @media  (max-width: 768px) {
    display: none;
}
`;


const ModalContent = styled.div`
  
  padding: 1.5rem 1rem 0.6rem 1.5rem;
  @media  (max-width: 768px) {
    display: none;
}
`;

const FocoDeCalorContainer = styled.div`
 @media  (max-width: 768px) {
    display: none;
}
h3{
  color:#fff;
}
ul{
  list-style-type: none;
 /*  display: flex;
  flex-direction: column;
  align-items: center; */
  li{
    display: flex;
    align-items: center;
    
    & + li {
    margin-top: 8px;
  }
    span {
      margin-left: .7rem;
      padding-top:.2rem;
     /*  display: flex;
      align-items: center; */
    
      img{
        display: flex;
        align-items: center;
        width: 100%;
      }
      
    }
  }
}

`;
const TeritoryContent = styled.div`
 @media  (max-width: 768px) {
    display: none;
}
ul{
  list-style-type: none;
 /*  display: flex;
  flex-direction: column;
  align-items: center; */
  li{
    display: flex;
    align-items: center;
    
    & + li {
    margin-top: 8px;
  }
    span {
      margin-left: .7rem;
      padding-top:.2rem;
     /*  display: flex;
      align-items: center; */
    
      img{
        display: flex;
        align-items: center;
        width: 100%;
      }
      
    }
  }
}

`;

const CloseModalButton = styled.button`
 @media  (max-width: 768px) {
    display: none;
}
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
  @media  (max-width: 768px) {
    top: -4.5rem;
  right: 15rem;
  margin: 0 auto;
  transform: rotate(0.75turn);
  }
`;


function Index({ showModal, setShowModal }) {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateX(0%)` : `translateX(-100%)`
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
                <FocoDeCalorContainer>
                <h3>Foco de calor</h3>
                <ul>
                 <li>
                   <img src={Calorvermelho} alt="" /> <span>1 Dias</span>
                 </li>
                 <li>
                   <img src={Calorlaranja} alt="" />  <span>1-2 Dias</span> 
                 </li>
                 <li>
                   <img src={Calorl3} alt="" /> <span>2-3 Dias</span> 
                 </li>
                 <li>
                   <img src={Calorl4} alt="" /> <span>3-4 Dias</span> 
                 </li>
                 <li>
                   <img src={Calorl5} alt="" /> <span>4-5 Dias</span> 
                 </li>
                 
               </ul>
                </FocoDeCalorContainer>
                
                
              
              <TeritoryContent>
              <ul>
                 <li>
                 <img src={Desmatamento} alt="" /><span>Desmatamento</span>
                 </li>
                 <li>
                  <img src={Território} alt="" /> <span>Território</span> 
                 </li>
                 <li>
                  <img src={Adjancente} alt="" /> <span>Território Adjancente</span> 
                 </li>
                 <li>
                  <img src={Localisacao} width="22" alt="" /><span>Minha posição</span> 
                 </li>
      
               </ul>
              </TeritoryContent>
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              >
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="63" height="150" viewBox="0 0 63 150">
  <defs>
    <filter id="Subtração_1" x="0" y="0" width="63" height="150" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Grupo_1118" data-name="Grupo 1118" transform="translate(9 -467.999)">
    <g transform="matrix(1, 0, 0, 1, -9, 468)" filter="url(#Subtração_1)">
      <path id="Subtração_1-2" data-name="Subtração 1" d="M-4048,161h-23V29h23a21.863,21.863,0,0,1,8.564,1.729,21.93,21.93,0,0,1,6.993,4.715,21.932,21.932,0,0,1,4.715,6.993A21.866,21.866,0,0,1-4026,51v88a21.863,21.863,0,0,1-1.729,8.563,21.931,21.931,0,0,1-4.715,6.993,21.93,21.93,0,0,1-6.993,4.715A21.863,21.863,0,0,1-4048,161Z" transform="translate(4080 -23)" fill="#f0b90b"/>
    </g>
    <g id="Grupo_1116" data-name="Grupo 1116" transform="translate(0 66)">
      <g id="Grupo_1137" data-name="Grupo 1137">
        <text id="Legenda" transform="translate(14 433) rotate(90)" font-size="18" font-family="Montserrat-Regular, Montserrat"><tspan x="0" y="0">Legenda</tspan></text>
        <line id="Linha_4" data-name="Linha 4" y2="26" transform="translate(39.5 461.5)" fill="none" stroke="rgba(0,0,0,0.51)" stroke-linecap="round" stroke-width="1.5"/>
      </g>
    </g>
  </g>
</svg>

              </CloseModalButton>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  )
}

export default Index
