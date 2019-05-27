import React, { Component } from 'react';
import moment from 'moment';
import ShowIcons from './ShowIcons';

import {dailyData} from '../types/types';
interface Props{
    data:dailyData
}


class WeatherCard extends Component<Props> {
    state = {  }
    render() { 
        
        const {icon , description, ts, hi_temp, lo_temp } = this.props.data;
        console.log(ts);
        
        return ( 
            <div className="weather_card">
                <div className="icon__wrapper">
                    <ShowIcons icon={icon} />
                    <p>{ description}</p>
                </div>
                <div className="hi__low">
                    <i className="wi wi-direction-up"> { hi_temp}<span className="wi wi-celsius"></span> </i> 
                    <i className="wi wi-direction-down"> {lo_temp}<span className="wi wi-celsius"></span></i> 
                </div> 
                <div className="weather__date">
                    <p>{ moment(ts).format('ddd, MMM Do') }</p>
                </div>
                 
            </div>

         );
    }
}
 
export default WeatherCard;