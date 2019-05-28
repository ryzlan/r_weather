

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

export type dailyData={
    icon:string,
    description:string,
    hi_temp:number ,
    lo_temp:number ,
    ts: string
}

export type hourlyData = {
    Time:string,
    Temp:string
}

export type Geolocation = {
	latitude: number;
	longitude: number;
};
