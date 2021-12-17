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
    morningTemp,
    eveningTemp,
    dayTemp
  ) {
    super(utcNum, low, high, precipitation, sunrise, sunset, description);
    this.morningTemp = morningTemp;
    this.eveningTemp = eveningTemp;
    this.dayTemp = dayTemp;
  }
}
