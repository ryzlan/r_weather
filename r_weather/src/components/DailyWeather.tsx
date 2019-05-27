import * as React from 'react';
import WeatherCards from './WeatherCards';

import {dailyData } from '../types/types';
interface Props{
    dailyData?: dailyData[]
}


export default class DailyWeather extends React.Component<Props>{


    render(){
        const {dailyData}  = this.props;
        if(dailyData){
            return(
                <div className="forcast__wrapper">
                    {dailyData.map((w,index)=>{
                        return <WeatherCards key={index} data={w} />
                    })}
                </div>
            );
        }
        
    }
}