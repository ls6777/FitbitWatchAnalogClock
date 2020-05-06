import * as messaging from "messaging";
import { geolocation } from "geolocation";

// import and create Weather class in companion/index.js to start weather companion process.
// import Weather from '../common/weather/companion';
// let weather = new Weather;



export default class Weather 
{
  constructor() 
  {
    messaging.peerSocket.addEventListener("message", (evt) => 
    {
      if (evt.data !== undefined && evt.data.command == "weather") 
      {
        getWeather();
      }
    });
  }
}

function getWeatherCondition(id)
{
  if (id >= 200 && id < 300)
    {
      return "Thunderstorm";
    }
  else if (id >= 300 && id < 400)
    {
      return "Drizzle";
    }
  else if (id >= 500 && id < 600)
    {
      return "Rain";
    }
  else if (id >= 600 && id < 700)
    {
      return "Snow";
    }
  else if (id == 711)
    {
      return "Smoke";
    }
  else if (id == 731)
    {
      return "Dust";
    }
  else if (id == 741)
    {
      return "Fog";
    }
  else if (id == 781)
    {
      return "Tornado";
    }
  else if (id == 800)
    {
      return "Clear";
    }
  else if (id == 801)
    {
      return "Few Clouds";
    }
  else if (id == 802)
    {
      return "Scattered Clouds";
    }
  else if (id == 803)
    {
      return "Broken Clouds";
    }
  else if (id == 804)
    {
      return "Overcast Clouds";
    }
  else
    {
      return "Clear";
    }
}

const getWeather = () => 
{
  let n = new Date;
  console.log('Updating Weather from companion and calling geolocation at ' + n);
  geolocation.getCurrentPosition(locationSuccess, locationError);
  //console.log("Position: " + lat + ", " + lon);
};

const locationSuccess = (position) => 
{
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetchWeatherOpenweather(lat, lon);
  console.log("Position: " + lat + ", " + lon);
};

const locationError = (error) => 
{
  console.log("locationError: " + error.code + " => " + error.message);
}

const fetchWeatherOpenweather = (lat, lon) => 
{
  const APIKEY = '40ed40883f0964911396ea2c04020029';
  const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
  let url = ENDPOINT + '&lat=' + lat + '&lon=' + lon + '&appid=' + APIKEY;
  console.log('Calling OpenWeather.org API: ' + url); 
  fetch(url)
  .then(function(response)
  {
    if(response.ok) 
    {    
      console.log("response ok");  
    }    
    response.json()
    .then(function(data) 
    {
      const weather= 
      {
        temperature: data["main"]["temp"],
        conditions: getWeatherCondition(data["weather"][0]["id"]),
        isDay: (data.dt > data.sys.sunrise && data.dt < data.sys.sunset)
      }
      console.log("cond code = " + data["weather"][0]["id"])
      console.log("Weather: " + weather.conditions);
      returnWeatherData(weather);
    });
  })
  .catch(function(err) 
  {
    console.log("Error while fetching weather: " + err);
  });
};  

const fetchWeatherUnderground = (lat, lon) => 
{
  const APIKEY = '';
  
  console.log('Calling OpenWeather.org API');
  const url = 'http://api.wunderground.com/api/' + APIKEY + '/conditions/astronomy/q/' + lat + ',' + lon + '.json';
  fetch(url)
  .then(function(response)
  {
    response.json()
    .then(function(data) 
    {
      const weather = 
      {
        temperature: data["current_observation"]["temp_c"],
        conditions: data["current_observation"]["weather"]
      }
      console.log("Weather: " + weather.conditions);
      returnWeatherData(weather);
    });
  })
  .catch(function(err) 
  {
    console.log("Error while fetching weather: " + err);
  });
};  

const returnWeatherData = (data) => 
{
  if(messaging.peerSocket.readyState === messaging.peerSocket.OPEN) 
  {
    // Send a command to the device
    messaging.peerSocket.send(data);
  } 
  else 
  {
    console.log("Error: Connection is not open");
  }
};