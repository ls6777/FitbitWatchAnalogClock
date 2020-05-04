export function round (x, n)
{
  return parseFloat(Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
}

export function calculateDistance(distance, unitType) 
{
  if (unitType === 'miles')
  {
    return `${round((distance * 0.00062137), 2)} m`;
  } 
  else 
  {
    return `${round((distance / 1000), 2)} km`;
  }
}

// provide day from 0 - 6
export function getDisplayDay(day) 
{
  const strDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return strDay[day];
}

// provide month from 0 - 11
export function getDisplayMonth(month) 
{ 
  const strMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return strMonth[month];
}

// Add zero in front of numbers < 10
export function zeroPad(i) 
{
  if (i < 10) 
  {
    i = "0" + i;
  }
  return i;
}

// Truncate Text
export const truncateText = (t, max) => 
{
  //truncatedText = t.substring(0, Math.min(max,t.length));
  if (t.length <= max) 
  {
    return t;
  } 
  else 
  {    
    return t.substring(0,(max-2)) + ".."
  }
}