import React from 'react';
import { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

import Unsplash from 'unsplash-js';

import './components/InputQuery';
import InputQuery from './components/InputQuery';
import DisplayWeather from './components/DisplayWeather';

import {weather__APIkey,W_Current_url ,unsplash_key , unsplash_secret } from './config/configs'
import {WeatherData , Geolocation} from './types/types';


interface Props{}

interface State{
  loading:boolean,
  weatherData?:WeatherData,
  img?:string
}

const unsplash = new Unsplash({
  applicationId:unsplash_key,
  secret:unsplash_secret
});


class App extends React.Component{
  state={
    loading:true,
    weatherData:undefined,
    img:''
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

  getCurrentWeather = async(geolocation : Geolocation)  =>{
    const {latitude, longitude} = geolocation;
    console.log(geolocation);
    
    let url = `${W_Current_url}lat=${latitude}&lon=${longitude}&key=${weather__APIkey}`;
    console.log(url);

   let query =await fetch(url)
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
        return obj.des;
      })
      .catch(err => console.log(err));

      return query
      
  }
  getPicture=  (query : string )=>{
    
    unsplash.search.photos(query, 1 , 10 )
    .then(res => res.json())
    .then(json => {
      console.log(json);
      this.setState({
        loading:false,
        img:json.results[2].urls.regular,
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





  componentDidMount(){
    this.getCurrentUserLocation()
      .then(geolocation => this.getCurrentWeather(geolocation))
      .then((query)=> {
        console.log(query);
        
        this.getPicture(query)
      })
      .catch(err => console.log(err));
  }


  render(){


    const displayWeather = this.state.weatherData && (
        <DisplayWeather weatherData={this.state.weatherData} img={this.state.img}/>
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
