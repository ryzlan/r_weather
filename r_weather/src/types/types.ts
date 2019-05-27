

export type WeatherData = {
    city:string,
    country:string,
    description:string,
    temp:number,
    realfeel:number,
    icon:string,
    sunrise:string,
    sunset:string,
    ts:number,
    lat:string, 
    lon:string

};

export type Geolocation = {
	latitude: number;
	longitude: number;
};
