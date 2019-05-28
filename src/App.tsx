import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Skeleton from 'react-skeleton-loader';

import './components/InputQuery';
import Navigation from './components/Navigation';
import DisplayWeather from './components/DisplayWeather';
import DailyWeather from './components/DailyWeather';
import Graph from './components/Graph';
import Loading from './components/Loading';

import { WeatherData, dailyData, hourlyData } from './types/types';


import { getCurrentUserLocation, getCurrentWeather, getPicture, getdailyWeather, gethourlyWeather, getCurrentWeatherCC, getdailyWeatherCC, gethourlyWeatherCC } from './helpers/helpers';

interface Props{}

interface State{
  loading:boolean,
  weatherData?:WeatherData,
  dailyData?:dailyData[],
  hourlyData?:hourlyData[]
  img?:string,
  lat:number,
  lon:number,
  term:string ,
  error:string
}




class App extends React.Component{
  interval: any;
  state ={
    loading:true,
    weatherData:undefined,
    dailyData:undefined,
    hourlyData:undefined,
    img:'',
    lat:23.781375999999998,
    lon:90.36185599999999,
    city:'Dhaka',
    country:'BD',
    term:'',
    error:''
  }


  componentWillMount(){
    const cachedHits = localStorage.getItem('data');
    if(cachedHits !== null ){
      this.setState(JSON.parse(cachedHits))
    }
   
    
  }


  componentDidMount(){
    this.init();
    
    
     this.interval= setInterval( ()=>{this.refresh()},5 * 60000 );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  refresh =() =>{
    getCurrentWeatherCC(this.state.city ,this.state.country)
    .then((term)=>{
      this.setState({
        weatherData:term,
        term: term.description,
        loading: false
      })
      return term.description;
    })
    .then((des)=>getPicture(des))
    .then((img_Data)=>{
      this.setState({
        img:img_Data.img,
      })
    })
    .then(()=>getdailyWeatherCC(this.state.city ,this.state.country ))
    .then((arrdata)=>{
      this.setState({
        dailyData:arrdata,
        
      })
    })
    .then(()=>gethourlyWeatherCC(this.state.city ,this.state.country))
    .then(arr =>{
      this.setState({
        hourlyData:arr
      })
      localStorage.setItem('data', JSON.stringify(this.state));
    })
    .catch(err =>{
      this.setState({
        error:err
      })
      console.log(err);
      
    });
  }


  init =  () =>{

    getCurrentUserLocation()
    //get Geolocation
    .then(geolocation =>{
      const {latitude, longitude} = geolocation;
      this.setState({
        lat:latitude,
        lon:longitude
      })
      return {latitude , longitude };
    })
    .then(geo => getCurrentWeather(geo.latitude ,geo.longitude))
    .then((term)=>{
      this.setState({
        weatherData:term,
        term: term.description,
        loading: false,
        city:term.city,
        country:term.country,
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
      
      
      this.setState({
        dailyData:arrdata,
        
      })
    })
    .then(()=>gethourlyWeather(this.state.lat , this.state.lon))
    .then(arr =>{
      
      
      this.setState({
        hourlyData:arr
      })

      localStorage.setItem('data', JSON.stringify(this.state));
    })
    .catch(err => {
      this.setState({
        error:err
      })
      console.log(err);
      
    });
  }



  handleSubmit=(city :string , country :string)=>{
     console.log(city, country);
     this.setState({
       loading:true,
       city:city,
       country:country
 
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
       
        
        this.setState({
          dailyData:arrdata,
          loading: false
        })
      })
      .then(()=>gethourlyWeatherCC(city, country ))
      .then(arr =>{
        
        
        this.setState({
          hourlyData:arr
        })
        localStorage.setItem('data', JSON.stringify(this.state));
      })
      .catch((err) =>{
        this.setState({
          error:err
        })
        console.log(err);
        
      } )
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
        <DisplayWeather weatherData={this.state.weatherData} 
        refresh={this.refresh} />
    );

    const dailyWeather = this.state.dailyData && <DailyWeather dailyData={this.state.dailyData} /> ;

    const hourlyWeather = this.state.hourlyData ? <Graph data={this.state.hourlyData}/> :<Skeleton animated height="450px" width="100%"/>


    

    return (
      <>
        <Navigation handleSubmit={this.handleSubmit} />
        <section style={sectionStyle}>
          <Container>
            <Row>
              {this.state.error && (
                <div className="error-main">{this.state.error}</div>
              )}
            </Row>
            <Row>{displayWeather}</Row>
            <Row>{dailyWeather }</Row>
            <Row>
              <div className="graph-container">
                <h3 className="text-centr">12-hrs Forecast</h3>
                {hourlyWeather}
              </div>
            </Row>
          </Container>
        </section>
      </>
    );
  }
  
}

export default App;
