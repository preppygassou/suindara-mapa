import { useContext, useEffect } from "react";
import { useScenario } from "services/business";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({ name, source, style, zIndex = 10, setExtent=false }) => {
	const { map } = useScenario();
	let firstRender = true

	useEffect(() => {
		if (!map) return;

		let vectorLayer = new OLVectorLayer({
			className:name,
			source,
			style
		});
		vectorLayer.on('postrender', function(event) {
				 if(setExtent && firstRender && source.getExtent()[0] !== Infinity ){
					firstRender = false
					 map.getView().fit(source.getExtent(), {
						maxZoom: 18,
						duration: 1500,
						padding: [20, 20, 20, 20]
						});			
					}
		});

		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map]);

	return null;
};

export default VectorLayer;