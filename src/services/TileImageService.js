import * as olSource from "ol/source";

function TileImageService({ url }) {
	return new olSource.TileImage({ url });
}

export default TileImageService;
