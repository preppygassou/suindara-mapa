import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { usePasswordless } from "services/auth";

function GeoJSONService({ url }) {
     const { token } = usePasswordless();

     const loader = function () {
          var format = new GeoJSON();
          var source = this;

          getJson(url, function (response) {
               if (Object.keys(response).length > 0) {
                    var features = format.readFeatures(response, {
                         featureProjection: 'EPSG:3857'
                    });
                    source.addFeatures(features);
                    //dispatch your custom event
                    source.set('loadend', Math.random());
               }
          });
     }
  
     const getJson = (url, callback) => {
          const myInit = { 
               headers: {'Authorization': token}
          };

          fetch(url, myInit)
               .then(response => response.json())
               .then(data => {
                    // console.log('Success:', data);
                    callback(data);
               })
               .catch((error) => {
                    // console.error('Error:', error);
               });
     };

     return new VectorSource({
          loader: loader
     });
}

export default GeoJSONService;
