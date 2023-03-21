import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import DowloadIcon from 'assets/images/abaixar-icon.svg'
import TrocaMapaIcon from 'assets/images/trocamapa-icon.svg'
import ModalTrocaMapa from 'components/organisms/ModalTrocaMapa'
import { useReport } from 'services/data';

import { saveAs } from 'file-saver';

const Container = styled.div `
position: absolute;
top: 5%;
right: 0;
z-index:1;
display: flex;
flex-direction: column;
align-items: center;
`;

export const Button = styled.button`
/* padding: 16px 32px; */
/* border-radius: 4px; */
border: none;
outline: none;
/* background: #141414;
color: #fff; */
background: none;
width: 100px;
height: 100px;
cursor: pointer;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
/* position: absolute;
top: 40%;
left: -.6rem;
z-index:1; */
svg{
  width: 100%;
}
& + button {
  margin-bottom:-5rem;
}
`;



const RightSide = () =>{
    const [showModal, setShowModal] = useState(false);
    const [dataDownload, setDataDownload] = useState(false);
    const [territorioId, setTerritorioId] = useState(null);
    const report = useReport();

    useEffect(() => {
        if (!report.error) {
            let file = new Blob([report.result], {type: "text/plain;charset=utf-8"});
            saveAs(file, 'file.csv');
        }
    }, [report.result]);

    const openChangeMapa = () => {
        setShowModal(prev => !prev);
    };
    
    const downloadReport = () => {
        report.get(1);
    };

  // useEffect(() => {
	// 	if (!territorioId) 
	// 	{
	// 		setDataDownload(false);
	// 		return;
	// 	}
	// 	downloadFile();
	// }, [territorioId,dataDownload,downloadFile]);	


    return (
        <>
            <Container>
                <Button onClick={downloadReport} >

                    <img src={DowloadIcon} />
                    
                </Button>
                <Button onClick={openChangeMapa}>
                <img src={TrocaMapaIcon} alt="" />
                </Button>
            </Container>
            <ModalTrocaMapa showModal={showModal} setShowModal={setShowModal} />
        </>
    )
}

export default RightSide
