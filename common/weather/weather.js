import * as messaging from "messaging";

export default class Weather 
{
  constructor() 
  {
    let temperature = undefined;
    let conditions  = undefined;
    let updated_at  = undefined;
    let is_success  = undefined;
    let isDay       = undefined;
    
    this.onsuccess = undefined;
    this.onerror   = undefined;
    
    if(this.onsuccess) this.onsuccess(evt.data);
    console.log("Weather constructor");
  }
  
  // send message to Companion to fetch updating weather information
  fetch() 
  {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) 
    {
      console.log("sending message: weather");
      messaging.peerSocket.send(
      {
        command: 'weather'
      });
    } 
    else 
    {
      console.log("messaging.peerSocket.readyState couldn't be OPEN.");
    }
  }
  
  // set weather information from 'data' received. 
  update(data) 
  {    
    if(data) 
    { 
      console.log(`temperature: ${data.temperature} and conditions: ${data.conditions}`)
      this.temperature = data.temperature ? data.temperature : "-";
      this.conditions  = data.conditions ? data.conditions : "Loading...";
      this.updated_at  = new Date;
      this.is_success  = data.conditions ? true : false;
      this.isDay       = data.isDay;
    }
  }
};

//setInterval(fetch, 30*1000*60);