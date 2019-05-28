import * as React from 'react';
import {Component  } from 'react';

import {WeatherData} from '../types/types';
import moment from 'moment';
import ShowIcons from './ShowIcons';
import Skeleton from 'react-skeleton-loader';

interface Props{
    weatherData?:WeatherData,
    refresh: () => void
}
interface State{

}

export default class DisplayWeather extends Component<Props , State> {
    

    render(){
        const {weatherData} = this.props;
        
        if(weatherData){
            const {city , country , description ,icon , realfeel , sunrise ,sunset , temp , ts } = weatherData;
        

            return(
                 <div className="hero_container" >
                    <p className="lone" onClick={this.props.refresh}><i className="wi wi-refresh"></i></p>
                     <div className="text-block">
                         <div className="banner">
                             <p> { city +","+ country || <Skeleton animated/> }  </p>
                             <p> { moment(ts *1000).format('dddd, MMM Do') || <Skeleton animated/> } </p>
                         </div>
                         <div className="main">
                             <div className="main__icon"> 
                                 <ShowIcons icon={icon} /> 
                                 <p> {description || <Skeleton animated/>} </p>
                             </div>
                             <div className="temp">
                                 <p className="temp_val" >{ temp || <Skeleton animated/>}<span className="wi wi-celsius"></span>
                                 </p>
                                 <p className="realfeel">
                                     <i className="wi wi-thermometer">{" "+ realfeel +" " }<span className="wi wi-celsius"></span></i></p>

                                 <p className="rs">
                                 { sunrise + ' ' } <i className="wi wi-sunrise"></i> <i  className="wi wi-sunset">{ ' ' +sunset }</i> </p>
                             </div>
                         </div>
                     </div>
                 </div>


            );
        }
        
    }
}