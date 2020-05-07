// Get the icon that corresponds to the provided weather condition and time of day
export function getWeatherIcon(condition, isDay) 
{
  const period = isDay ? 'day' : 'night';

  switch (condition) 
  {
    case "Clear":
      return `icons/weather/clearsky-${period}.png`;
    case "Thunderstorm":
      return `icons/weather/thunderstorm.png`;
    case "Drizzle":
      return `icons/weather/drizzle.png`;
    case "Rain":
      return `icons/weather/rain.png`;
    case "Snow":
      return `icons/weather/snow.png`;
    case "Smoke":
      return `icons/weather/smoke.png`;
    case "Dust":
      return `icons/weather/dust.png`;
    case "Fog":
      return `icons/weather/fog.png`;
    case "Tornado":
      return `icons/weather/tornado.png`;
    case "Few Clouds":
      return `icons/weather/fewclouds-${period}.png`;
    case "Scattered Clouds":
      return `icons/weather/scatteredclouds-${period}.png`;
    case "Broken Clouds":
      return `icons/weather/brokenclouds.png`;
    case "Overcast Clouds":
      return `icons/weather/overcastclouds.png`;
    
    default:
      return 'icons/weather/clearsky-day.png';
  }
}
