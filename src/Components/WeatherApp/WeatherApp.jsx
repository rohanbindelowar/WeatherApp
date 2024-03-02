import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import moon from '../Assets/R.png'


 const WeatherApp = () => {
    let apiKey ="527bd7aca93a5997f87b6a1958bd86c4";
    const [weatherIcon, setWIcon] = useState(cloud_icon);
    const [errorMessage, setErrorMessage] = useState('');

   
    const search = async ()=>{
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value ===""){
            return 0;
        }
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`
        
        let response = await fetch(url);
        let data = await response.json();
       
        if (data.cod === '404') {
            setErrorMessage("City not found. Please enter a valid city name.");
            return;
        }
        else if (data.main.humidity === "" || data.wind.speed === "" || data.main.temp === "" || data.name === "") {
            setErrorMessage("Failed to fetch weather data. Please try again later.");
            return;
        }
        else{
            setErrorMessage("");
        }

        
        const humidity = document.getElementsByClassName("humidityPer")
        const wind = document.getElementsByClassName("windRate")
        const temp = document.getElementsByClassName("weatherTemp")
        const location = document.getElementsByClassName("weatherlocation")
        
        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = Math.floor(data.wind.speed)+"Km/h";
        temp[0].innerHTML = Math.floor(data.main.temp)+"°C";
        location[0].innerHTML = data.name;

        const weatherCondition = data.weather[0].icon;
        switch(weatherCondition){
            case "01d":
                setWIcon(clear_icon);
                break;
            case "01n":
                setWIcon(moon);
                break;
            case "02d":
            case "02n":
                setWIcon(cloud_icon);
                break;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                setWIcon(drizzle_icon);
                break;
            case "09d":
            case "09n":
                setWIcon(rain_icon);
                break;
            case "10d":
            case "10n":
                setWIcon(cloud_icon);
                break;
            case "13d":
            case "13n":
                setWIcon(snow_icon);
                break;
            default:
                setWIcon(clear_icon)
        }
    }
  return (
    <div className="container">
        <div className="top_bar">
            <input type="text" className="cityInput" placeholder='Enter city name here!' autoFocus/>
            <div className="search_icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="search icon" />
            </div>
        </div>
        <div className="errorMes">{errorMessage}</div>
        <div className="weatherImg">
            <img src={weatherIcon} alt="Weather Image" />
        </div>
        <div className="weatherTemp">24 &deg;C</div>
        <div className="weatherlocation">Anime World</div>
        <div className="dataContainer">
            <div className="element">
                <img src={humidity_icon} alt="humidity icon" className='icon'/>
                <div className="data">
                    <div className="humidityPer">60%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="wind icon" className='icon'/>
                <div className="data">
                    <div className="windRate">13 Km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}
 export default WeatherApp
