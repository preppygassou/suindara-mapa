//import Modal from "../components/Modal";
import React, { useEffect,useState} from 'react';
import { useScenario } from "services/business";
import { getCenter } from 'ol/extent';
import { toLonLat } from 'ol/proj';
import { toStringHDMS } from 'ol/coordinate';
import styled from 'styled-components';
import Modal from './Modal';

export const Container = styled.div`
  /* height: 100vh; */
  width: 100%;
`;

const getInfo = (layer, feature) => {
    let info = {}
    let props = []
	const escape = ['id', 'geometry', 'classe']
	for (const [key, value] of Object.entries(feature.values_)) {
        if(!escape.includes(key) && value){
            props.push({"key":key, "value":value})
		}
	}
    info['props'] = props
	let center = toLonLat(getCenter(feature.getGeometry().getExtent()))
    info['center'] = center
	info['coord'] = toStringHDMS(center)
	info['layer_name'] = layer.className_
	info['footer'] = true ? ['Desmatamento', 'Foco de calor', 'Direção'].includes(layer.className_ ) : false
    info['erase_line'] = true ? ['Direção'].includes(layer.className_ ) : false
	return info  
}

const PopUpModal = ({target, relatorioBaseUrl}) => {
    const { map } = useScenario();	
    const [hasLine, sethasLine] = useState(false);	
    const [content, setContent] = useState({props:[]});
    const [territorioId, setTerritorioId] = useState(null);
    const [showModal, setShowModal] = useState(false);
	
    const openModal = () => {
        setShowModal(prev => !prev);
    };

	useEffect(() => {
		if (!map) return;
        map.on('click', function (evt) {
            let info = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                return {layer, feature}
                }, {hitTolerance: 10});
            if(info){
                if(info.layer.className_ === 'Território'){
                    setTerritorioId(info.feature.values_.id)
                }
                setContent(getInfo(info.layer, info.feature));
                console.log(getInfo(info.layer, info.feature))
                openModal()
            }
		},
		{
			hitTolerance: 10,
    	});
		
		//change mouse cursor when over marker
		map.on('pointermove', function (e) {
			if (e.dragging) {
				return;
			}
			var pixel = map.getEventPixel(e.originalEvent);
			var hit = map.hasFeatureAtPixel(pixel);
			map.getTarget().style.cursor = hit ? 'pointer' : '';
		});
		return;
	}, [map]);

    return (
      <Container onClick={openModal}>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        target={target}
        hasLine={hasLine}
        sethasLine={sethasLine}
        content={content}
      />
    </Container>
	);
}

export default PopUpModal;



