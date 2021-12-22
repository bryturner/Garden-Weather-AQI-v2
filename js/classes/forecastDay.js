import Day from './day';
import * as helpers from '../helpers';

export default class ForecastDay extends Day {
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
    morningTemp,
    eveningTemp,
    dayTemp
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
    this.morningTemp = morningTemp;
    this.eveningTemp = eveningTemp;
    this.dayTemp = dayTemp;
  }

  getForecastWeekday() {
    return new Date(this.dateTime * 1000).toLocaleDateString(undefined, {
      weekday: 'short',
    });
  }

  getForecastDay() {
    return new Date(this.dateTime * 1000).toLocaleDateString(undefined, {
      day: 'numeric',
    });
  }

  getMorningTemp() {
    return this._formatTemp(this.morningTemp);
  }
  getEveningTemp() {
    return this._formatTemp(this.eveningTemp);
  }
  getDayTemp() {
    return this._formatTemp(this.dayTemp);
  }
}
