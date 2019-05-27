import * as React from 'react';
import {Component , Fragment } from 'react';

import {WeatherData} from '../types/types';


interface Props{
    weatherData?:WeatherData
}
interface State{

}

export default class DisplayWeather extends Component<Props , State> {
    

    render(){
        const {weatherData} = this.props;
        if(weatherData){
            return(
                <Fragment>
                    <h3>{weatherData.city}, {' '}
                        {weatherData.country}
                    </h3>
                    <h4>
                        {weatherData.temp}
                    </h4>
                    
                </Fragment>
            );
        }
        
    }
}