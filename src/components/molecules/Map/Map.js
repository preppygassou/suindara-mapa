import React, { useRef, useEffect } from "react"
import { useScenario } from "services/business";
import * as ol from "ol";
import "./Map.css";

const Map = ({ children, zoom, center }) => {
	const mapRef = useRef();
	const { map, setMap } = useScenario();

	// on component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			overlays: []
		};

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		return () => mapObject.setTarget(undefined);
	}, []);

	// zoom change handler
	useEffect(() => { 
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	// useEffect(() => {
	// 	if (!map) return;

	// 	map.getView().setCenter(center)
	// }, [center])

	return (
		<div ref={ mapRef } className="ol-map">
			{ children }
		</div>
	)
}

export default Map;
