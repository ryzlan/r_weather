import React ,{ Component} from 'react';
import '../weather-icon/css/weather-icons.css';


interface Props{
     icon:string
}


export default  class ShowIcons extends Component<Props>{
    renderIcons(code : string ){
        let cd = parseInt(code);
        if(cd>= 200 && cd <=202 ){
            return (<i className="wi wi-thunderstorm"></i>)
        }else if(cd >= 230 && cd <=233){
            return (<i className="wi wi-storm-showers"></i>)
        }else if(cd >= 300 && cd <= 302){
            return (<i className="wi wi-sprinkle"></i>)
        }else if(cd >= 500 && cd <= 502){
            return (<i className="wi wi-rain"></i>)
        }else if(cd >= 520 && cd <= 521){
            return (<i className="wi wi-showers"></i>)
        }else if(cd >= 600 && cd <= 602){
            return (<i className="wi wi-snow"></i>)
        }else if(cd >= 610 && cd <= 612){
            return (<i className="wi wi-sleet"></i>)
        }else if(cd >= 621 && cd <= 623){
            return (<i className="wi wi-snow-wind"></i>)
        }else if(cd >= 700 && cd <= 751){
            return (<i className="wi wi-fog"></i>)
        }else if(cd === 800){
            return (<i className="wi wi-day-sunny"></i>)
        }else if(cd >= 801 && cd <= 803){
            return (<i className="wi wi-cloudy-windy"></i>)
        }else if(cd === 804 ){
            return (<i className="wi wi-cloudy"></i>)
        }else if(cd === 900 ){
            return (<i className="wi wi-raindrop"></i>)
        }else{
            return(<i>no icon</i>)
        }
    }

    render(){
        return this.renderIcons(this.props.icon);
    }
}
