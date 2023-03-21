import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import LegendaBtn from 'assets/images/legenda-btn-mobile.svg'
import ModalLegenda from 'components/organisms/ModalLegenda'
import ModalLegendaMobil from 'components/organisms/ModalLegenda/mobile'

export const Button = styled.button`
/* padding: 16px 32px; */
/* border-radius: 4px; */
border: none;
outline: none;
/* background: #141414;
color: #fff; */
display: block;

background: none;
height: 100px;
cursor: pointer;
-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 40%;
  left: -.6rem;
  z-index:1;
  svg{
    width: 100%;
  }
  @media  (max-width: 768px) {
    display:none;
 
}
`;
export const ButtonMobil = styled.button`
/* padding: 16px 32px; */
/* border-radius: 4px; */
border: none;
outline: none;
/* background: #141414;
color: #fff; */
background: none;
width: 150px;
height: 10px;
cursor: pointer;
-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  left: 50%;
 
  bottom: 1.9rem;
  transform: translate(-50%, 6%);
  margin: 0 auto;
    
    
  
  z-index:1;
  img{
    width: 100%;
  }
  display: none;
  @media  (max-width: 768px) {
   display: block;
   position: absolute;
   
}
`;


 const LeftSide = () =>{
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
    <Button onClick={openModal} >
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
    </Button>
    <ButtonMobil onClick={openModal}>
      <img src={LegendaBtn} alt="" />
    </ButtonMobil>
    <ModalLegenda showModal={showModal} setShowModal={setShowModal} />
    <ModalLegendaMobil showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
export default LeftSide


