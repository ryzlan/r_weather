import { Geolocation, WeatherData, dailyData } from '../types/types';
import { W_Current_url, weather__APIkey, unsplash_key, unsplash_secret, daily_url, hourly_url } from '../config/configs';
import Unsplash from 'unsplash-js';
import moment from 'moment';




export const getCurrentUserLocation =(): Promise<Geolocation>=>{
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

export const getCurrentWeather = async(geolocation : Geolocation) : Promise<WeatherData> =>{
  const {latitude, longitude} = geolocation;
  let url = `${W_Current_url}lat=${latitude}&lon=${longitude}&key=${weather__APIkey}`;
  console.log(url);
    return new Promise((resolve , reject) =>{
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
        resolve({
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
        });
        
        

        
      })
      .catch(err => {
        console.log(err)
        reject(err);
      });
})
 

    
    
}

export const getCurrentWeatherCC = async(city : string , country :string ) : Promise<WeatherData> =>{
  let url = `${W_Current_url}city=${city}&country=${country}&key=${weather__APIkey}`;
  console.log(url);
    return new Promise((resolve , reject) =>{
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
        resolve({
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
        });
        
        

        
      })
      .catch(err => {
        console.log(err)
        reject(err);
      });
})
 

    
    
}





const unsplash = new Unsplash({
  applicationId:unsplash_key,
  secret:unsplash_secret
});


type img ={
  img : string
}

export const getPicture=  (query : string ) : Promise<img> =>{
    
return new Promise((resolve , reject) =>{
  unsplash.search.photos(query+" nature", 1 , 10 )
  .then(res => res.json())
  .then(json => {
    console.log(json);
    resolve({
      img:json.results[3].urls.regular
    })
  })
  .catch((err)=>{
    console.log(err);
    reject(err);
  })
})

  
}

export const   getdailyWeather =  (lat:number ,lon:number)  =>{
  let url = `${daily_url}lat=${lat}&lon=${lon}&days=5&key=${weather__APIkey}`;
  return new Promise((resolve, reject)=>{
    fetch(url)
    .then(res => res.json())
    .then(data =>{
      
      return data.data.map((w : any)=>{
        console.log(w.valid_data);
        
        return {
          icon:w.weather.code,
          description:w.weather.description,
          hi_temp:w.max_temp,
          lo_temp:w.min_temp,
          ts:w.valid_date
        }
      })
    })
    .then((arr  )=>{
      console.log(arr);
      resolve(arr)
      
    })
    .catch(err => {
      reject(err);
      console.log(err)
    });
  })
 
}
export const   getdailyWeatherCC =  (city : string , country :string)  =>{
  let url = `${daily_url}city=${city}&country=${country}&days=5&key=${weather__APIkey}`;
  return new Promise((resolve, reject)=>{
    fetch(url)
    .then(res => res.json())
    .then(data =>{
      
      return data.data.map((w : any)=>{
        console.log(w.valid_data);
        
        return {
          icon:w.weather.code,
          description:w.weather.description,
          hi_temp:w.max_temp,
          lo_temp:w.min_temp,
          ts:w.valid_date
        }
      })
    })
    .then((arr  )=>{
      console.log(arr);
      resolve(arr)
      
    })
    .catch(err => {
      reject(err);
      console.log(err)
    });
  })
 
}

export const gethourlyWeather=(lat:number ,lon:number)=>{
  let url = `${hourly_url}lat=${lat}&lon=${lon}&hours=12&key=${weather__APIkey}`;
  return new Promise ((resolve , reject)=>{
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
    .then((arr ) =>{ 
      resolve(arr)
      })
    .catch(err =>{
      reject(err)  ;
      console.log(err)});
  })
 
}


export const gethourlyWeatherCC=(city : string , country :string)=>{
  let url = `${hourly_url}city=${city}&country=${country}&hours=12&key=${weather__APIkey}`;
  return new Promise ((resolve , reject)=>{
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
    .then((arr ) =>{ 
      resolve(arr)
      })
    .catch(err =>{
      reject(err)  ;
      console.log(err)});
  })
 
}