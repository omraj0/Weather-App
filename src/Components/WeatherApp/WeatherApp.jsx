import React, { useState } from 'react'
import './WeatherApp.css';

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/moreCloudy.png";
import few_cloud_icon from "../Assets/lessCloudy.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import thunder_icon from "../Assets/thunder.png";
import smoke_icon from "../Assets/smoke.png";
import minTemp from "../Assets/cold.png";
import maxTemp from "../Assets/hot.png";
import sunrise from "../Assets/sunrise.png";
import sunset from "../Assets/sunset.png";
// import fog_icon from "../Assets/foggy.png";



const WeatherApp = () => {

    const apiKey ="286fd64d3d9c8a01301197a02ef99d0b";
    const [wicon, setWicon] = useState(cloud_icon);
    const search = async ()=>{
        const element = document.getElementsByClassName('cityInput');
        if(element[0].value === ""){
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${element[0].value}&appid=${apiKey}`
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        const humidity = document.getElementsByClassName('humidity-percentage');
        const wind = document.getElementsByClassName('wind-rate');
        const temp = document.getElementsByClassName('weather-temp');
        const feelslike = document.getElementsByClassName('weather-temp-feelslike');
        const location = document.getElementsByClassName('weather-location');
        const minTemp = document.getElementsByClassName('min-temp');
        const maxTemp = document.getElementsByClassName('max-temp');
        const sunRise = document.getElementsByClassName('sun-rise');
        const sunSet = document.getElementsByClassName('sun-set');
        // const weatherr = document.getElementsByClassName('weather-name');


        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.ceil(data.wind.speed) + "Km/h";
        temp[0].innerHTML = Math.floor(data.main.temp) + "&deg;C";
        feelslike[0].innerHTML = "Feels like " + Math.floor(data.main.feels_like) + "&deg;C";
        location[0].innerHTML = data.name;
        minTemp[0].innerHTML = data.main.temp_min + "&deg;C";
        maxTemp[0].innerHTML = data.main.temp_max + "&deg;C";
        // weatherr[0].innerHTML = data.weather[0].main;
        

        let sec = data.sys.sunrise;
        let date = new Date(sec * 1000);
        let timeStr = `${date.getHours()} : ${date.getMinutes()}`;
      
        let time = data.sys.sunset;
        let settime = new Date(time * 1000);
        let settimestr = `${settime.getHours()} : ${settime.getMinutes()}`;        

        sunRise[0].innerHTML = timeStr;
        sunSet[0].innerHTML = settimestr;

        

        if(data.weather[0].icon === "01d" || data.weather[0].icon ==="01n"){
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon ==="02n"){
            setWicon(few_cloud_icon);
        } 
        else if(data.weather[0].icon === "03d" || data.weather[0].icon ==="03n"){
            setWicon(cloud_icon);
        } 
        else if(data.weather[0].icon === "04d" || data.weather[0].icon ==="04n"){
            setWicon(cloud_icon);
        } 
        else if(data.weather[0].icon === "09d" || data.weather[0].icon ==="09n"){
            setWicon(drizzle_icon);
        } 
        else if(data.weather[0].icon === "10d" || data.weather[0].icon ==="10n"){
            setWicon(rain_icon);
        } 
        else if(data.weather[0].icon === "11d" || data.weather[0].icon ==="11n"){
            setWicon(thunder_icon);
        } 
        else if(data.weather[0].icon === "13d" || data.weather[0].icon ==="13n"){
            setWicon(snow_icon);
        } 
        else if(data.weather[0].icon === "50d" || data.weather[0].icon ==="50n"){
            setWicon(smoke_icon);
        } 
        else {
            setWicon(clear_icon);
        }

    }



    const handleSearchClick = (event)=>{
        if(event.keyCode === 13){
            event.preventDefault();
            search();
        }
    }


  return (
    <div>
      <div className="container">
        <div className="top-bar">
            <input type="text" className = "cityInput" placeholder="Search" onKeyDown={handleSearchClick}/>
            <div className="search-icon" onClick={search}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            {/* <div className='weather-name'></div> */}
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp"></div>
        <div className="weather-temp-feelslike"></div>
        <div className="weather-location"></div>

        <div className="temp-data-container">
            <div className="temp-element">
                <img src={minTemp} alt="" className="icon" />
                <div className="temp-data">
                    <div className="min-temp"></div>
                    <div className="text">Min Temp</div>
                </div>
            </div>
            
            <div className="temp-element">
                <img src={maxTemp} alt="" className="icon" />
                <div className="temp-data">
                    <div className="max-temp"></div>
                    <div className="text">Max Temp</div>
                </div>
            </div>
        </div>

        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percentage"></div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            
            <div className="element">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate"></div>
                    <div className="text">Wind</div>
                </div>
            </div>
        </div>

        <div className="sun-data-container">
            <div className="sun-element">
                <img src={sunrise} alt="" className="icon" />
                <div className="sun-data">
                    <div className="sun-rise"></div>
                    <div className="text">Sunrise</div>
                </div>
            </div>
            
            <div className="sun-element">
                <img src={sunset} alt="" className="icon" />
                <div className="sun-data">
                    <div className="sun-set"></div>
                    <div className="text">Sunset</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
