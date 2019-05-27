import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'


import './components/InputQuery';
import Navigation from './components/Navigation';
import DisplayWeather from './components/DisplayWeather';
import DailyWeather from './components/DailyWeather';
import Graph from './components/Graph';
import Loading from './components/Loading';

import { WeatherData, dailyData, hourlyData } from './types/types';


import {getCurrentUserLocation , getCurrentWeather, getPicture, getdailyWeather, gethourlyWeather, getCurrentWeatherCC, getdailyWeatherCC, gethourlyWeatherCC} from './helpers/helpers';

interface Props{}

interface State{
  loading:boolean,
  weatherData?:WeatherData,
  dailyData?:dailyData[],
  hourlyData?:hourlyData[]
  img?:string,
  lat:number,
  lon:number,
  term:string 
}




class App extends React.Component{
  state={
    loading:true,
    weatherData:undefined,
    dailyData:undefined,
    hourlyData:undefined,
    img:'',
    lat:0,
    lon:0,
    term:''
  }





  componentDidMount(){
    getCurrentUserLocation()
      //get Geolocation
      .then(geolocation =>{
        const {latitude, longitude} = geolocation;
        this.setState({
          lat:latitude,
          lon:longitude
        })
        return geolocation;
      })
      .then(geolocation => getCurrentWeather(geolocation))
      .then((term)=>{
        this.setState({
          weatherData:term,
          term: term.description
        })
        return term.description;
      })
      .then((des)=>getPicture(des))
      .then((img_Data)=>{
        this.setState({
          img:img_Data.img,
          
        })
      })
      .then(()=>getdailyWeather(this.state.lat , this.state.lon ))
      .then((arrdata)=>{
        console.log(arrdata);
        
        this.setState({
          dailyData:arrdata,
          loading: false
        })
      })
      .then(()=>gethourlyWeather(this.state.lat , this.state.lon))
      .then(arr =>{
        console.log(arr);
        
        this.setState({
          hourlyData:arr
        })
      })
      .catch(err => console.log(err));
  }




  handleSubmit=(city :string , country :string)=>{
     console.log(city, country);
     this.setState({
       loading:true
 
     })
     
     getCurrentWeatherCC(city ,country)
      .then((term)=>{
        this.setState({
          weatherData:term,
          term: term.description
        })
        return term.description;
      })
      .then((des)=>getPicture(des))
      .then((img_Data)=>{
        this.setState({
          img:img_Data.img,
          
        })
      })
      .then(()=>getdailyWeatherCC(city, country ))
      .then((arrdata)=>{
        console.log(arrdata);
        
        this.setState({
          dailyData:arrdata,
          loading: false
        })
      })
      .then(()=>gethourlyWeatherCC(city, country ))
      .then(arr =>{
        console.log(arr);
        
        this.setState({
          hourlyData:arr
        })
      })
   }




  render(){
    const sectionStyle = {
      width: "100%",
      height: "100%",
      backgroundImage: `url("${this.state.img}")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
  }

    const displayWeather = this.state.weatherData && (
        <DisplayWeather weatherData={this.state.weatherData} />
    );

    const dailyWeather = this.state.dailyData && <DailyWeather dailyData={this.state.dailyData} /> ;

    const hourlyWeather = this.state.hourlyData && <Graph data={this.state.hourlyData}/>

    const body = (<section style={sectionStyle}>
    <Container >
      <Row>
       
        {displayWeather}
      </Row>
      <Row>
      
          {dailyWeather}  
        
      </Row>
      <Row>
        <div className="graph-container">
          <h3 className="text-centr">12-hrs Forecast</h3>
          {hourlyWeather}
        </div>
        
      </Row>

    </Container>
    </section>);

    return (
      <>
      <Navigation handleSubmit={this.handleSubmit} />
      {this.state.loading ? 
      <Loading />
      :
      body
      }
      
      </>
    );
  }
  
}

export default App;
