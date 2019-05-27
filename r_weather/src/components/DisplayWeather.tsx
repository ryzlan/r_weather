import * as React from 'react';
import {Component  } from 'react';

import {WeatherData} from '../types/types';
import moment from 'moment';
import ShowIcons from './ShowIcons';


interface Props{
    weatherData?:WeatherData,
    img?:string
}
interface State{

}

export default class DisplayWeather extends Component<Props , State> {
    

    render(){
        const {weatherData, img} = this.props;
        
        if(weatherData){
            const {city , country , description ,icon , realfeel , sunrise ,sunset , temp , ts } = weatherData;
            
            const sectionStyle = {
                width: "100%",
                height: "400px",
                backgroundImage: `url("${img}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }



            return(
                 <div className="hero_container" style={sectionStyle}>
                     <div className="text-block">
                         <div className="banner">
                             <p> { city +","+ country  }  </p>
                             <p> { moment(ts *1000).format('dddd, MMM Do')  } </p>
                         </div>
                         <div className="main">
                             <div className="main__icon"> 
                                 <ShowIcons icon={icon} /> 
                                 <p> {description } </p>
                             </div>
                             <div className="temp">
                                 <p className="temp_val" >{ temp }<span className="wi wi-celsius"></span>
                                 </p>
                                 <p className="realfeel"><i className="wi wi-thermometer">{ realfeel}<span className="wi wi-celsius"></span></i></p>
                                 <p className="rs"><i className="wi wi-sunrise">{ sunrise }</i> <i  className="wi wi-sunset">{ sunset }</i> </p>
                             </div>
                         </div>
                     </div>
                 </div>


            );
        }
        
    }
}