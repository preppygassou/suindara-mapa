import { useContext, useEffect } from "react";
import { useScenario } from "services/business";
import OLVectorLayer from "ol/layer/Vector";
import {Vector as VectorSource} from 'ol/source';

import GeoJSON from 'ol/format/GeoJSON';

import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import {getCenter} from 'ol/extent';
import { fromLonLat, get } from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';

// Converts from degrees to radians.
function toRadians(degrees) {
	return degrees * Math.PI / 180;
  };
   
  // Converts from radians to degrees.
  function toDegrees(radians) {
	return radians * 180 / Math.PI;
  }
  
  function ConvertDDToDMS(D){
    return [0|D, 'º ', 0|(D<0?D=-D:D)%1*60, "' ", 0|D*60%1*60, '"'].join('');
}
  function azimute(coords){
	  console.log(coords)
	let startLat = toRadians(coords[0][1]);
	let startLng = toRadians(coords[0][0]);
	let destLat = toRadians(coords[1][1]);
	let destLng = toRadians(coords[1][0]);
  
	let y = Math.sin(destLng - startLng) * Math.cos(destLat);
	let x = Math.cos(startLat) * Math.sin(destLat) -
		  Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
	let brng = Math.atan2(y, x);
	brng = toDegrees(brng);
	return ConvertDDToDMS((brng + 360) % 360);
  }



let getFeature = (coords) =>{
	const line = new LineString(coords).transform('EPSG:4326','EPSG:3857')	
	let distance = line.getLength()
	return {
		"type": "FeatureCollection",
		"name": "distance",
		"crs": {
			"type": "name",
			"properties": {
				"name": "urn:ogc:def:crs:OGC:1.3:CRS84"
			}
		},
		"features": [{
			"type": "Feature",
			"properties": {
				"id":1,
				"Distância": distance < 1000 ? `${Math.round(distance)} m` : `${Math.round(distance/1000)} km`,
				"Azimute" : azimute(coords)
			},
			"geometry": {
				'type': 'LineString',
				'coordinates': line.getCoordinates()
			}
		}]
	}

}


	

const LineLayer = ({ name, p0, p1, style, zIndex = 100}) => {
	const { map } = useScenario();
	let firstRender = true
	const line = new LineString([p0,p1]).transform('EPSG:4326','EPSG:3857')	
	useEffect(() => {
		if (!map) return;
		
		let features = 	new GeoJSON().readFeatures(
			getFeature([p0,p1])) 

		let source = new VectorSource({features})
		let vectorLayer = new OLVectorLayer({
			source: source,
			className:name,			
			style:style
		});

		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);



		vectorLayer.on('postrender', function(event) {
				 if( firstRender && line.getExtent()[0] !== Infinity ){
					firstRender = false
					 map.getView().fit(line.getExtent(), {
						maxZoom: 18,
						duration: 1500,
						padding: [100, 100, 100, 100]
						});			
					}

		});


		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map, p0, p1]);

	return null;
};

export default LineLayer;