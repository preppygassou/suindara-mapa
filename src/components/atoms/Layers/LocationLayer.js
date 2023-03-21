import { useContext, useEffect } from "react";
import { useScenario } from "services/business";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from 'ol/source/Vector';

import Feature from 'ol/Feature';
import {circular} from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';


const LocationLayer = ({name, style, coords, accuracy}) => {
	const { map } = useScenario();
	const source = new VectorSource();

	useEffect(() => {
		if (!map) return;

		let vectorLayer = new OLVectorLayer({
			className:name,
			source,
			style
		});
	
		const buffer = circular(coords, accuracy);
		source.clear(true);
		source.addFeatures([
		  new Feature(new Point(fromLonLat(coords)))
		]);

		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(10);

		return () => {
			// console.log('removendo')
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map, accuracy,name,style,source,coords]);

	return null;
};

export default LocationLayer;