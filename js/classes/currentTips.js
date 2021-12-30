import * as helpers from '../helpers.js';

export class CurrentTips {
  #aqi;
  constructor(
    dateTime,
    dailyWeatherArr,
    morningTemp,
    eveningTemp,
    dayTemp,
    aqiArr
  ) {
    this.dateTime = dateTime;
    this.dailyWeatherArr = dailyWeatherArr;
    this.morningTemp = morningTemp;
    this.eveningTemp = eveningTemp;
    this.dayTemp = dayTemp;
    this.aqiArr = aqiArr;
  }

  getCurrentDate() {
    return new Date(this.dateTime * 1000).toLocaleDateString([], {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
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

  getAqi() {
    const pm25Arr = helpers.getPm25Arr(this.aqiArr);

    const sumPm25 = helpers.sumPm25Nums(pm25Arr);

    // Return the average aqi
    const pm25 = Math.trunc(sumPm25 / pm25Arr.length);
    this.#aqi = helpers.convertAqi(pm25);
    return this.#aqi;
  }

  getAqiCondition() {
    if (this.#aqi === 'n/a')
      return 'cannot be found. Please check your local weather information.';
    if (this.#aqi <= 50) return 'healthy';
    if (this.#aqi > 50 && this.#aqi <= 100) return 'moderate';
    if (this.#aqi > 100 && this.#aqi <= 150)
      return 'unhealthy for sensitive groups';
    if (this.#aqi > 150 && this.#aqi <= 200) return 'unhealthy';
    if (this.#aqi > 200) return 'extremely unhealthy';
  }

  getAqiRecommendation() {
    if (this.#aqi === 'n/a') return '';
    if (this.#aqi <= 50)
      return 'It is a great day to garden! Get outside and enjoy the fresh air.';
    if (this.#aqi > 50 && this.#aqi <= 100)
      return 'It is a good day to garden unless you are sensitive to pollution.';
    if (this.#aqi > 100 && this.#aqi <= 150)
      return 'It is an okay day to garden, but another day with a lower AQI might be better.';
    if (this.#aqi > 150 && this.#aqi <= 200)
      return 'You should probably stay inside and protect your health. Gardening can wait for another day.';
    if (this.#aqi > 200)
      return 'Stay inside, close the windows and crank up that air purifier. Climate change is real.';
  }

  _getPrecipitationData(dailyWeatherArr) {
    const precipitationArr = dailyWeatherArr.map(arr => arr.pop);
    return this._findLargestPrecipPercentage(precipitationArr);
  }

  _findLargestPrecipPercentage(precipitationArr) {
    const largestPercent = Math.max(...precipitationArr.slice(0, 3));
    const convertedPercent = largestPercent * 100;
    return convertedPercent;
  }

  getFuturePrecipitation() {
    return this._getPrecipitationData(this.dailyWeatherArr);
  }
}
