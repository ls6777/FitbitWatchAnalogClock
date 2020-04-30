import { me as appbit } from "appbit";
import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import * as messaging from "messaging";
import {
  calculateDistance,
  getDisplayDay,
  getDisplayMonth,
  zeroPad,} from "../common/utils";

// Update the clock every second
clock.granularity = "seconds";

const lblBattery = document.getElementById("batt");
const background = document.getElementById("background");
const lblDate = document.getElementById("date");
const lblDay = document.getElementById("day");
const lblHR = document.getElementById("hr");
const lblSteps = document.getElementById("steps");
const lblCals = document.getElementById("cals");

// Get HR
const hrm = new HeartRateSensor();
hrm.onreading = function () 
{
  lblHR.text = `${hrm.heartRate}`;
}
hrm.start ();

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
  const displayDay = getDisplayDay(day);
  const displayMonth = getDisplayMonth(month);
  const charge = battery.chargeLevel;
  
  // Change battery text color based on percentage
  lblBattery.text = `${charge}`;
  if (charge > 75)
  {
    lblBattery.style.fill = "green";
  } 
  else if (charge > 50) 
  {
    lblBattery.style.fill = "yellow";
  }
  else if (charge > 25)
  {
    lblBattery.style.fill = "orange";
  }
  else
  {
    lblBattery.style.fill = "red";
  }
  
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
