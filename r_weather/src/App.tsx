import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import Unsplash from 'unsplash-js';

import './components/InputQuery';
import InputQuery from './components/InputQuery';
import DisplayWeather from './components/DisplayWeather';
import DailyWeather from './components/DailyWeather';
import Graph from './components/Graph';

import {weather__APIkey,W_Current_url ,unsplash_key , unsplash_secret ,daily_url,hourly_url } from './config/configs'
import { WeatherData, Geolocation, dailyData ,hourlyData } from './types/types';
import moment from 'moment';


interface Props{}

interface State{
  loading:boolean,
  weatherData?:WeatherData,
  dailyData?:dailyData[],
  hourlyData?:hourlyData[]
  img?:string,
  lat:string,
  lon:string,
  term:string 
}

const unsplash = new Unsplash({
  applicationId:unsplash_key,
  secret:unsplash_secret
});


class App extends React.Component{
  state={
    loading:true,
    weatherData:undefined,
    dailyData:undefined,
    hourlyData:undefined,
    img:'',
    lat:'',
    lon:'',
    term:''
  }

  getCurrentUserLocation =(): Promise<Geolocation>=>{
    return new Promise((resolve , reject) =>{
      if(!navigator.geolocation){
        reject('Geolocation is not Working');

      }else {
        console.log('getting location/...');
        navigator.geolocation.watchPosition(position =>{
          
          resolve({
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
          });
        } , err =>{
          reject(`Cant get current Location :${err.message}`);
        })
        
      }
    })
  }

  getCurrentWeather = async(geolocation : Geolocation)  =>{
    const {latitude, longitude} = geolocation;
    this.setState({
      lat:latitude,
      lon:longitude
    })
    console.log(geolocation);
    
    let url = `${W_Current_url}lat=${latitude}&lon=${longitude}&key=${weather__APIkey}`;
    console.log(url);

   await fetch(url)
      .then(res => res.json())
      .then(data =>{
        let obj = {
          city:data.data[0].city_name,
          country: data.data[0].country_code,
          des:data.data[0].weather.description,
          temp:data.data[0].temp,
          realfeel:data.data[0].app_temp,
          icon:data.data[0].weather.code,
          sunrise:data.data[0].sunrise,
          sunset:data.data[0].sunset,
          ts:data.data[0].ts,
          lat:data.data[0].lat,
          lon:data.data[0].lon

        };
        return  {
          city:obj.city,
          country:obj.country,
          description:obj.des,
          temp:obj.temp,
          realfeel:obj.realfeel,
          icon:obj.icon,
          sunrise:obj.sunrise,
          sunset:obj.sunset,
          ts:obj.ts,
          lat:obj.lat, 
          lon:obj.lon
        }
        
        
      })
      .then((term)=>{
        this.setState({
          weatherData:term,
          term: term.description
        })
        return 
      })

      .catch(err => console.log(err));

      
      
  }
  getPicture=  (query : string ):void =>{
    
    unsplash.search.photos(query+" nature", 1 , 10 )
    .then(res => res.json())
    .then(json => {
      console.log(json);
      this.setState({
        loading:false,
        img:json.results[3].urls.regular,
      })
    })
    .catch((err)=>{
      console.log(err);
      // this.setState({
      //   loading:false,
      //   error_picture:"Broken Search ... Please type again",
      // })
    })
  }

  getdailyWeather =  ():void  =>{
    let url = `${daily_url}lat=${this.state.lat}&lon=${this.state.lon}&days=5&key=${weather__APIkey}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data =>{
      
      return data.data.map((w : any)=>{
        console.log(w.valid_data);
        
        return {
          icon:w.weather.code,
          des:w.weather.description,
          hi_temp:w.max_temp,
          lo_temp:w.min_temp,
          ts:w.valid_date
        }
      })
    })
    .then((arr)=>{
      console.log(arr);
      
      this.setState({
        dailyData:arr
      })
    })
    .catch(err => console.log(err));
  }
  gethourlyWeather=():void =>{
    let url = `${hourly_url}lat=${this.state.lat}&lon=${this.state.lon}&hours=12&key=${weather__APIkey}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data =>{
      return data.data.map((d:any )=>{
        let date = moment(d.ts *1000 ).format('h:mm A');
        return {
          Time: date ,
          Temp:d.temp 
        }
      })
      
    })
    .then((arr) => this.setState({
      loading: false ,
      hourlyData:arr
    }))
    .catch(err => console.log(err));
  }




  componentDidMount(){
    this.getCurrentUserLocation()
      .then(geolocation => this.getCurrentWeather(geolocation))
      .then((des)=>this.getPicture(this.state.term))
      .then(()=>this.getdailyWeather())
      .then(()=>this.gethourlyWeather())
      .catch(err => console.log(err));
  }


  render(){


    const displayWeather = this.state.weatherData && (
        <DisplayWeather weatherData={this.state.weatherData} img={this.state.img}/>
    );

    const dailyWeather = this.state.dailyData && <DailyWeather dailyData={this.state.dailyData} /> ;

    const hourlyWeather = this.state.hourlyData && <Graph data={this.state.hourlyData}/>

    return (
      <Container>
        <Row>
          <InputQuery />
        </Row>
        <Row>
          {displayWeather}
        </Row>
        <Row>
          {dailyWeather}
        </Row>
        <Row>
          {hourlyWeather}
        </Row>
  
      </Container>
    );
  }
  
}

export default App;
