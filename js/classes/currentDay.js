import Day from "./day";
import * as helpers from "../helpers";

export default class CurrentDay extends Day {
  constructor(
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description,
    aqi,
    currentTemp,
    feelsLike,
    currentLocation
  ) {
    super(utcNum, low, high, precipitation, sunrise, sunset, description);
    this.aqi = aqi;
    this.currentTemp = currentTemp;
    this.feelsLike = feelsLike;
    this.currentLocation = currentLocation;
  }
}

// const options = {
//   weekday: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
// };
// const toLongDateTime = today => {
//   const toCurrentTime = new Date(today * 1000).toTimeString().slice(0, 8);
//   currentTime.innerHTML = `Local Time: ${toCurrentTime}`;
//   currentDate.innerText = new Date(today * 1000).toLocaleDateString(
//     undefined,
//     options
//   );
// };
