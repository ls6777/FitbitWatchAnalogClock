// Get the icon that corresponds to the provided weather condition and time of day
export function getWeatherIcon(condition, isDay) 
{
  const period = isDay ? 'day' : 'night';
  
  console.log("condition = " + condition);
  console.log("isDay = " + isDay);

  switch (condition) 
  {
    case "Clear":
      return `icons/weather/clearsky-${period}.png`; 
      /*
    case "Thunderstorm":
      return `icons/weather/clearsky-${period}.png`;
    case Conditions.FewClouds:
      return `icons/weather/fewclouds-${period}.png`;
    case Conditions.ScatteredClouds:
      return `icons/weather/scatteredclouds-${period}.png`;
    case Conditions.BrokenClouds:
      return `icons/weather/brokenclouds-${period}.png`;
    case Conditions.ShowerRain:
      return 'icons/weather/showerrain.png';
    case Conditions.Rain:
      return 'icons/weather/rain.png';
    case "Clear":
      return `icons/weather/clearsky-${period}.png`;
    case Conditions.Snow:
      return 'icons/weather/snow.png';
    case Conditions.Mist:
      return 'icons/weather/mist.png';
    case Conditions.Unknown:
      return 'icons/weather/clearsky-day.png';
      */
    default:
      return 'icons/weather/clearsky-day.png';
  }
}
