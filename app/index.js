import { me as appbit } from "appbit";
import clock from "clock";
import document from "document";
import { units, locale, preferences } from "user-settings";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { Barometer } from "barometer";
import { battery } from "power";
import { display } from "display";
import * as myWeather from "./components/weather";
import * as wIcons from "../common/weather/icons";
import * as messaging from "messaging";
import * as util from "../common/utils";

// Update the clock every second
clock.granularity = "seconds";

const lblBattery = document.getElementById("batt");
const background = document.getElementById("background");
const lblDate = document.getElementById("date");
const lblDay = document.getElementById("day");
const lblHR = document.getElementById("hr");
const lblSteps = document.getElementById("steps");
const lblCals = document.getElementById("cals");
const lblElevation = document.getElementById("elevation");
const weatherIcon = document.getElementById("weather_icon");
let weatherTemperature = document.getElementById("weatherTemperature");

// Get HR
if (HeartRateSensor) 
{
  const hrm = new HeartRateSensor();
  hrm.addEventListener("reading", () => 
  {
    lblHR.text = `${hrm.heartRate}`;
  });
  display.addEventListener("change", () => 
  {
    // Automatically stop the sensor when the screen is off to conserve battery
    display.on ? hrm.start() : hrm.stop();
  });
  hrm.start();
}

// Get barometer/elevation
if (Barometer) 
{
  const barometer = new Barometer({ frequency: 1 });
  barometer.addEventListener("reading", () => 
  {
    let distanceUnit = units.distance;
    let elevation = Math.round(altitudeFromPressure(barometer.pressure / 100));
    if ("us"== distanceUnit)
    {
      lblElevation.text = elevation + " ft";
    }
    else
    {
      lblElevation.text = Math.round(elevation / 3.281) + " m";
    }
  });
  display.addEventListener("change", () => 
  {
    // Automatically stop the sensor when the screen is off to conserve battery
    display.on ? barometer.start() : barometer.stop();
  });
  barometer.start();
}

/* ------- WEATHER ---------- */
const weatherCallback = (data) => 
{
  let temperatureUnit = units.temperature; // temperature unit came from FitBit App settings via user-settings.units
  console.log("Weather in main: " + JSON.stringify(data));
  if(data.is_success === true) 
  {
    weatherIcon.href = wIcons.getWeatherIcon(data.conditions, data.isDay);
    
    weatherTemperature.text = temperatureUnit === "C" ? 
      Math.round(data.temperature) + "°C" :
      Math.round(data.temperature * 9.0 / 5.0 + 32) + "°F";
  }
};
myWeather.initialize(weatherCallback);

// Converts pressure in millibars to altitude in feet
// https://en.wikipedia.org/wiki/Pressure_altitude
function altitudeFromPressure(pressure) 
{
  return (1 - (pressure/1013.25)**0.190284)*145366.45;
}

// Set analog clock
const hourHand = document.getElementById("hours");
const minHand = document.getElementById("mins");
const secHand = document.getElementById("secs");

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) 
{
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) 
{
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) 
{
  return (360 / 60) * seconds;
}

// Message is received
messaging.peerSocket.onmessage = evt => 
{
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "hour_hand_colour" && evt.data.newValue) 
  {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting hour hand color: ${color}`);
    hourHand.style.fill = color;
  } 
  else if (evt.data.key === "min_hand_colour" && evt.data.newValue) 
  {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting minute hand color: ${color}`);
    minHand.style.fill = color;
  } 
  else if (evt.data.key === "sec_hand_colour" && evt.data.newValue) 
  {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting second hand color: ${color}`);
    secHand.style.fill = color;
  }
};

// Message socket opens
messaging.peerSocket.onopen = () => 
{
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => 
{
  console.log("App Socket Closed");
};

// Update the clock every tick event
clock.ontick = (e) => 
{  
  const now = e.date;
  const hours = now.getHours() % 12;
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  const month = now.getMonth();
  const dayOfMonth = now.getDate();
  const day = now.getDay();
  const displayDay = util.getDisplayDay(day);
  const displayMonth = util.getDisplayMonth(month);
  const charge = battery.chargeLevel;
  
  // Change battery text color based on percentage
  lblBattery.text = `${charge}`;
  //lblBattery.style.fill = "white";
  
  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
  
  lblDate.text = `${dayOfMonth} ${displayMonth}`;
  lblDay.text = `${displayDay}`;
  
  if (appbit.permissions.granted("access_activity")) 
  {
    lblSteps.text = `${today.adjusted.steps}`;
    lblCals.text = `${today.adjusted.calories}`;
  }
}
