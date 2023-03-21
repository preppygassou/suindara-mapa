import React, { useState, useEffect} from 'react';
import { fromLonLat } from 'ol/proj';
import { TileImageService } from "services";
import { useFeatures } from "services/data";
import { useStyles } from "services/business";
import { PopUpModal } from "components/organisms/PopUpModal";
import { TileLayer, VectorLayer, LocationLayer, LineLayer } from "components/atoms/Layers";
import Layers from "components/molecules/Layers"
import Map from "components/molecules/Map";
import SideBar from 'components/atoms/SideBar';


const GIS = () => {
	const [center, setCenter] = useState([-47, -13.5]);
	const [zoom, setZoom] = useState(5);
	const [position, setPosition] = useState(null);
	const [accuracy, setAccuracy] = useState(10);
	const [target, setTarget] = useState(null);
	const features = useFeatures();
	const styles = useStyles();
	
	useEffect(() => {		
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(onPositionUpdate);
		}
	}, []);
	
	
	const draw = (coord) => {
		setTarget(coord)
	}

	const equals = (p0, p1, accuracy) => {
		if(!p0) return false
		const DEG2METER = (2*Math.PI*6378137/360)
		const tol = accuracy/DEG2METER
		let a = p0[0] - p1[0];
		let b = p0[1] - p1[1];
		let distance = Math.sqrt( a*a + b*b )
		return  distance < tol;
	}
	
	const onPositionUpdate = (pos) => {
		let coord = [pos.coords.longitude, pos.coords.latitude]
		let accuracy = pos.coords.accuracy
		if (!equals(position, coord, accuracy)){
			setPosition(coord)
			setAccuracy(accuracy)
		}
	};
	
	return (
		<div className='principal'>
			<Map center={fromLonLat(center)} zoom={zoom}>
				<Layers>
					<TileLayer
						name='Google'
						source={TileImageService({ url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' })}
						zIndex={0}
					/>
					{ features.territorio && (<VectorLayer
						name='Território'
						source={ features.territorio }
						style={ styles.territorio }
						setExtent={true}
						zIndex={0}
					/>) }
					{ features.desmatamento && (<VectorLayer
						name='Desmatamento'
						source={ features.desmatamento }
						style={ styles.desmatamento }
					/>)}									
					{ features.focoDeCalor && (<VectorLayer
						name='Foco de calor'
						source={features.focoDeCalor}
						style={ styles.focoDeCalor }
					/>)}		
					{ accuracy && position && (
						<LocationLayer 
							name='Localização'
							style={styles.localizacao} 
							coords={position}
							accuracy={accuracy}
						/>
					)}					
					{ target && position && (
						<LineLayer  
							name='Direção'
							p0={position}
							p1={target}
							style={styles.direcao}
						/>					
					)}
				</Layers>
				<PopUpModal 
              		target={draw}
					relatorioBaseUrl={process.env.REACT_APP_RELATORIO_API_URL}
				>
        		</PopUpModal> 
				
				<SideBar 
					target={draw}
					relatorioBaseUrl={process.env.REACT_APP_RELATORIO_API_URL}
				>    
				</SideBar>
      
			</Map>
		</div>
	);
}

export default GIS