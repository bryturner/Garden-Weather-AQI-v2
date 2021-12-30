import { Day } from './day.js';
import * as helpers from '../helpers.js';

export class ForecastDay extends Day {
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

  getForecastWeekdayTips() {
    return new Date(this.dateTime * 1000).toLocaleDateString(undefined, {
      weekday: 'long',
    });
  }

  lowerCaseDescription() {
    return this._setDescription().toLowerCase();
  }

  getMorningTemp() {
    return helpers.formatTemp(this.morningTemp);
  }
  getEveningTemp() {
    return helpers.formatTemp(this.eveningTemp);
  }
  getDayTemp() {
    return helpers.formatTemp(this.dayTemp);
  }
}
