import Day from "./day";
import * as helpers from "../helpers";

export default class CurrentDay extends Day {
  constructor(
    dateTime,
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description,
    aqi,
    currentTemp,
    feelsLike,
    currentLocation,
    weatherId,
    weatherMain
  ) {
    super(dateTime, low, high, precipitation, sunrise, sunset, description);
    this.aqi = aqi;
    this.currentTemp = currentTemp;
    this.feelsLike = feelsLike;
    this.currentLocation = currentLocation;
    this.weatherId = weatherId;
    this.weatherMain = weatherMain;
  }
}
