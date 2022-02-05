import * as helper from '../helpers.js';

class CurrentTips {
  _currentTempsArray = [];

  constructor(currentWeatherData) {
    this.currentWeatherData = currentWeatherData;

    this.formatCurrentDate();
    this.formatMorningTemp();
    this.formatDaytimeTemp();
    this.formatEveningTemp();
    this.setCurrentTemps();
    this.setAqiData();
    this.getFuturePrecipPercentage();
  }

  formatCurrentDate() {
    this.currentDate = new Date(
      this.currentWeatherData.dateTime * 1000
    ).toLocaleDateString([], {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  }

  formatMorningTemp() {
    this.morningTemp = helper.formatTemp(this.currentWeatherData.morningTemp);

    this._currentTempsArray.push(this.morningTemp);
  }

  formatDaytimeTemp() {
    this.daytimeTemp = helper.formatTemp(this.currentWeatherData.daytimeTemp);

    this._currentTempsArray.push(this.daytimeTemp);
  }

  formatEveningTemp() {
    this.eveningTemp = helper.formatTemp(this.currentWeatherData.eveningTemp);

    this._currentTempsArray.push(this.eveningTemp);
  }

  setCurrentTemps() {
    this.currentTempsArray = this._currentTempsArray;
  }

  _convertPm2_5ToAqi(pm2_5) {
    // The component pm2_5 from the api needs to be converted to the standard air quality index number. The conversion changes based on the pm2_5 number.
    if (pm2_5 < 0 || typeof pm2_5 !== 'number') return 'n/a';

    if (pm2_5 < 12) return Math.round(pm2_5 * 4.16);

    if (pm2_5 >= 12 && pm2_5 < 35.4)
      return Math.round(2.13 * (pm2_5 - 12.1) + 51);

    if (pm2_5 >= 35.5 && pm2_5 < 55.4)
      return Math.round(2.45 * (pm2_5 - 35.5) + 101);

    if (pm2_5 >= 55.5 && pm2_5 < 150.4)
      return Math.round(0.52 * (pm2_5 - 55.5) + 151);

    if (pm2_5 >= 150.5 && pm2_5 < 2_50.4)
      return Math.round(0.99 * (pm2_5 - 150.5) + 201);

    if (pm2_5 > 2_50.5) return Math.round(0.99 * (pm2_5 - 2_50.5) + 301);
  }

  getAqiNumber() {
    //  this.aqiNumber = 'n/a';
    this.aqiNumber = this._convertPm2_5ToAqi(this.currentWeatherData.aqiNumber);
    return this.aqiNumber;
  }

  formatAqiCondition(aqiNumber) {
    if (aqiNumber <= 50) this.aqiCondition = 'healthy';
    if (aqiNumber > 50 && aqiNumber <= 100) this.aqiCondition = 'moderate';
    if (aqiNumber > 100 && aqiNumber <= 150)
      this.aqiCondition = 'unhealthy for sensitive groups';
    if (aqiNumber > 150 && aqiNumber <= 200) this.aqiCondition = 'unhealthy';
    if (aqiNumber > 200) this.aqiCondition = 'extremely unhealthy';

    return this.aqiCondition;
  }

  formatAqiRecommendation(aqiNumber) {
    if (aqiNumber <= 50)
      this.aqiRecommendation =
        'It is a great day to garden! Get outside and enjoy the fresh air.';
    if (aqiNumber > 50 && aqiNumber <= 100)
      this.aqiRecommendation =
        'It is a good day to garden unless you are sensitive to pollution.';
    if (aqiNumber > 100 && aqiNumber <= 150)
      this.aqiRecommendation =
        'It is an okay day to garden, but another day with a lower AQI might be better.';
    if (aqiNumber > 150 && aqiNumber <= 200)
      this.aqiRecommendation =
        'You should probably stay inside and protect your health. Gardening can wait for another day.';
    if (aqiNumber > 200)
      this.aqiRecommendation =
        'Stay inside, close the windows and crank up that air purifier. Climate change is real.';

    return this.aqiRecommendation;
  }

  setAqiData() {
    const aqiNumber = this.getAqiNumber();
    this.aqiData = {
      aqiNumber: aqiNumber,
      aqiCondition: this.formatAqiCondition(aqiNumber),
      aqiRecommendation: this.formatAqiRecommendation(aqiNumber),
    };
  }

  _findLargestPrecipPercentage(precipArray) {
    //   Find the largest precipitation percentage in the next 3 days
    const largestPercent = Math.max(...precipArray.slice(0, 3));
    const convertedPercent = largestPercent * 100;
    return Math.trunc(convertedPercent);
  }

  getFuturePrecipPercentage() {
    //   Get all precipitation percentages from api
    const precipArray = this.currentWeatherData.dailyWeatherArray.map(
      arr => arr.pop
    );
    this.futurePrecipPercentage =
      this._findLargestPrecipPercentage(precipArray);
  }
}

export default CurrentTips;
