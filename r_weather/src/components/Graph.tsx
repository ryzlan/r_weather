import React, { Component } from 'react';

import {AreaChart, Area , XAxis, YAxis, CartesianGrid, Tooltip, Legend , Label} from 'recharts';


import {hourlyData} from '../types/types';
interface Props{
    data?:hourlyData[]
}


class Graph extends Component<Props> {
    
    render() { 
        if(this.props.data){
          return ( 	
            <AreaChart width={1000} height={500} data={this.props.data} margin={{ top: 10, right: 30, left:20, bottom: 20}}>
                <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0575e6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0575e6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5b86e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#5b86e5" stopOpacity={0}/>
                </linearGradient>
               </defs>
             <XAxis dataKey="Time" >
             <Label value="Time" offset={-10} position="insideBottomRight" />
             </XAxis>
              <YAxis dataKey="Temp"
                type="number"
                domain={['auto', 'auto']}
                label={{ value: 'Temperature in Celcius', angle: -90, position: 'insideLeft' }}/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
              <Tooltip />
              <Legend />
               <Area type="monotone"  dataKey="Temp" stroke="#4286f4" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
           );
        }else{
          return(<p>Graph nai</p>)
        }
           
        
    }
}
 
export default Graph;
