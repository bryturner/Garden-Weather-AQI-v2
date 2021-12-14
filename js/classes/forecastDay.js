import Day from "./day";
import * as helpers from "../helpers";

export default class ForecastDay extends Day {
  constructor(
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description,
    aqi,
    morningTemp,
    eveningTemp,
    dayTemp
  ) {
    super(utcNum, low, high, precipitation, sunrise, sunset, description, aqi);
    this.morningTemp = morningTemp;
    this.eveningTemp = eveningTemp;
    this.dayTemp = dayTemp;
  }
}
