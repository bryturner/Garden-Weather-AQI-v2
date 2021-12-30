import { Day } from './day.js';
import * as helpers from '../helpers.js';

export class CurrentDay extends Day {
  constructor(
    dateTime,
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description,
    weatherId,
    weatherMain,
    aqiArr,
    currentTemp,
    feelsLike,
    currentLocation
  ) {
    super(
      dateTime,
      low,
      high,
      precipitation,
      sunrise,
      sunset,
      description,
      weatherId,
      weatherMain
    );
    this.aqiArr = aqiArr;
    this.currentTemp = currentTemp;
    this.feelsLike = feelsLike;
    this.currentLocation = currentLocation;
  }

  getCurrentTime() {
    return this._convertToTime(this.dateTime);
  }

  getAqi() {
    const pm25Arr = helpers.getPm25Arr(this.aqiArr);

    const sumPm25 = helpers.sumPm25Nums(pm25Arr);

    // Return the average aqi
    const pm25 = Math.trunc(sumPm25 / pm25Arr.length);
    return helpers.convertAqi(pm25);
  }

  getCurrentTemp() {
    return helpers.formatTemp(this.currentTemp);
  }

  getFeelsLike() {
    return helpers.formatTemp(this.feelsLike);
  }

  getCurrentLocation() {
    return this.currentLocation.join(', ');
  }
}
