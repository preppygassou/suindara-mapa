import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import Calorvermelho  from "assets/images/Grupo 1130.svg"
import Calorlaranja  from "assets/images/Grupo 1129.svg"
import Calorl3  from "assets/images/calor-3.svg"
import Calorl4  from "assets/images/calor-4.svg"
import Calorl5  from "assets/images/calor-5.svg"
import Localisacao from "assets/images/Grupo 1131.svg"
import Desmatamento from "assets/images/Retângulo 1562.svg"
import Território from "assets/images/Retângulo 1563.svg"
import Adjancente from "assets/images/Retângulo 1564.svg"
import LegendaBtnIcon  from "assets/images/legenda-btn-mobile.svg"


const Background = styled.div`
  width: 100%;
 // height: 100%;
  //height: 50vh;
  //background: rgba(0, 0, 0, 0.8);
  padding: 1.6rem 0 1rem 0;

 /*  display: flex; */
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background:#212223 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
border-radius:17px 17px 0 0;
  display: none;
  z-index: 999;
  //position: relative;
  position: absolute;
  bottom: 0;
  @media  (max-width: 768px) {
    
  display: flex;
    
   

}
`;

/* const ModalWrapper = styled.div`
height: 100%;
width: 100%;
//position: absolute;
   // bottom: 0;
  // margin:0 auto;
   right: 0;
   border-radius: none;


  color: #fff;

  position: absolute;
  z-index: 9;

  @media  (max-width: 768px) {
 
}
`; */


const ModalContent = styled.div`
  
  //padding: 0 1rem 0.6rem 1.5rem;
  //justify-content: space-between;
  color: #fff;
  //align-items: center;
border-radius:17px !important;
height: 100%;
  @media  (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2,1fr);
 width: 100%;
  
}
`;

const FocoDeCalorContainer = styled.div`
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
ul{
  list-style-type: none;
 /*  display: flex;
  flex-direction: column;
  align-items: center; */
  li{
    & + li {
    margin-top: 8px;
  }
    display: flex;
    align-items: center;
    span {
      margin-left: .7rem;
      padding-top:.2rem;
     // margin-right: 2px;
      img{
        
        width: 100%;
      }
    }
  }
}

`;

const CloseModalButton = styled.button`
border: 0;
z-index:999;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 6%);
  margin: 0 auto;
  bottom: 15rem;
  height: 100px;
  
  //transform: rotate(0.75turn);
  padding: 0;
  z-index: 999;
  /* css */
  background: none;
-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  display: none;

  svg{
    width: 100%;
z-index:999;

    
  }
  @media  (max-width: 768px) {
    display: block;
  }
`;


function Index({ showModal, setShowModal }) {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    //transform: showModal ? `translateY(0%)` : `translateY(-100%)`
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
            {/* <ModalWrapper showModal={showModal}> */}
              
              <ModalContent showModal={showModal}>
                <FocoDeCalorContainer>
                <h3>Foco de calor</h3>
                <ul>
                 <li>
                    <img src={Calorvermelho} alt="" />
                    <span>1 Dias</span>
                 </li>
                 <li>
                 <img src={Calorlaranja} alt="" /> <span>1-2 Dias</span> 
                 </li>
                 <li>
                  <img src={Calorl3} alt="" /> <span>2-3 Dias</span> 
                 </li>
                 <li>
                  <img src={Calorl4} alt="" /> <span>3-4 Dias</span> 
                 </li>
                 <li>
                  <img src={Calorl5} alt="" /><span>4-5 Dias</span> 
                 </li>
                 
               </ul>
                </FocoDeCalorContainer>
                
                
              
              <TeritoryContent>
              <ul>
                 <li>
                  <img src={Desmatamento} alt="" /> <span>Desmatamento</span>
                 </li>
                 <li>
                  <img src={Território} alt="" /> 
                  <span>Território</span> 
                 </li>
                 <li>
                 <img src={Adjancente} alt="" />
                 <span>Território Adjancente</span> 
                 </li>
                 <li>
                  <img width="22" src={Localisacao} alt="" />
                   <span>Minha posição</span> 
                 </li>
      
               </ul>
              </TeritoryContent>
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              >
              <img src={LegendaBtnIcon} alt="" />

              </CloseModalButton>
           {/*  </ModalWrapper> */}
          </animated.div>
        </Background>
      ) : null}
    </>
  )
}

export default Index
