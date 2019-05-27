import React from 'react';
import { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import './App.css';


import './components/InputQuery';
import InputQuery from './components/InputQuery';
import DisplayWeather from './components/DisplayWeather';

import {weather__APIkey,W_Current_url} from './config/configs'
import {WeatherData , Geolocation} from './types/types';
import { log } from 'util';

interface Props{}

interface State{
  loading:boolean,
  weatherData?:WeatherData
}



class App extends React.Component{
  state={
    loading:true,
    weatherData:undefined
  }

  getCurrentUserLocation(): Promise<Geolocation>{
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

  getCurrentWeather = (geolocation : Geolocation): void =>{
    const {latitude, longitude} = geolocation;
    console.log(geolocation);
    
    let url = `${W_Current_url}lat=${latitude}&lon=${longitude}&key=${weather__APIkey}`;
    console.log(url);

    fetch(url)
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
        const weatherData = {
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
        this.setState({
          weatherData
        })
      })
      .catch(err => console.log(err));

      
      
  }

  componentDidMount(){
    this.getCurrentUserLocation()
      .then(geolocation => this.getCurrentWeather(geolocation))
      .then() // unsplashed api 
      .catch(err => console.log(err));
  }


  render(){


    const displayWeather = this.state.weatherData && (
        <DisplayWeather weatherData={this.state.weatherData} />
    );

    return (
      <Container>
        <Row>
          <InputQuery />
        </Row>
        <Row>
          {displayWeather}
        </Row>
  
      </Container>
    );
  }
  
}

export default App;
