import { Fill, Icon, Stroke, Style, Text } from 'ol/style';
import localizacao_svg from 'assets/images/localizacao.svg';
import foco_de_calor_svg from "assets/images/foco_de_calor.svg"
import foco_de_calor_alerta_svg from "assets/images/foco_de_calor_alerta.svg"


const useStyles = () => {
    function buildDesmatamentoStyle(feature, resolution) {
        return new Style({
            stroke: new Stroke({
                color: '#BEBDBC',
                width: 1,
            }),
            fill: new Fill({
                color: 'rgba(190, 189, 188,0.4)',
            }),
        });
    }

    function buildDirecaoStyle(feature, resolution) {
		return new Style({
            stroke: new Stroke({
                color: 'rgb(53, 121, 177)',
                width: 5,
            }),
            text: new Text({
                text: feature.get('Distância') + '\n' + feature.get('Azimute'),
                font: 'bold 14px arial',
                fill: new Fill({color: '#ffffff'}),
                backgroundFill: new Fill({color: 'rgb(53, 121, 177)'}),
                padding: [3,3,3,3]	
            }),
        });
    }

    function buildFocoDeCalorStyle(feature, resolution) {
        const colors = {
            "classe_1" : "#da1a1a",
            "classe_2" : "#fd8d3c",
            "classe_3" : "#fecc5c",
            "classe_4" : "#ffffb2",
            "classe_5" : "#bcb8b8",
            "classe_alerta" : "#ff0000",
        };

        let styles = {};

        Object.entries(colors).forEach(entry => {
            let [key, value] = entry;
            let icon = foco_de_calor_svg;
            if (key === 'classe_alerta'){
                icon = foco_de_calor_alerta_svg
            }
            styles[key] = new Style({
                image: new Icon({
                    crossOrigin: 'anonymous',
                    src: icon,
                    color: value,
                })
            })
        });
        
        return styles[feature.get('classe') ? feature.get('classe') : 'classe_5']; 
    }

    function buildLocalizacaoStyle(feature, resolution) {
        return new Style({
            image: new Icon({
                crossOrigin: 'anonymous',
                src: localizacao_svg
            }),
        });
    }

    function buildTerritorioStyle(feature, resolution){
        const styles = {
            'Território' :  new Style({
                stroke: new Stroke({
                    color: '#F4F4F4',
                    width: 1 ,     
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0)',
                }),
            }),
            "Adjacência" : new Style({
                stroke: new Stroke({
                    color: '#F4F4F4',
                      lineDash: [10],
                    width: 1,    
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0)',
                }),
            }),  
        };

        return styles[feature.get('Categoria')]; 
    }

    const styles = {
        'desmatamento': buildDesmatamentoStyle,	
        'direcao': buildDirecaoStyle,	
        'focoDeCalor': buildFocoDeCalorStyle,
        'localizacao': buildLocalizacaoStyle,	
        'territorio': buildTerritorioStyle,
    };

    return styles;
};

export default useStyles;