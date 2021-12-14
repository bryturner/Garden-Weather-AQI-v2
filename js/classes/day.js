import * as helpers from "../helpers";

export default class Day {
  constructor(
    utcNum,
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description,
    aqi
  ) {
    this.utcNum = utcNum;
    this.low = low;
    this.high = high;
    this.precipitation = precipitation;
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.description = description;
    this.aqi = aqi;

    this._convertToLongDay();
    this._convertSunTimes();
  }

  _convertToLongDay = () => {
    this.longDay = new Date(this.utcNum * 1000).toLocaleDateString(undefined, {
      longDay: "long",
    });
  };

  _convertSunTimes = () => {
    this.sunriseTime = new Date(this.sunrise * 1000)
      .toLocaleTimeString([], { hour12: false })
      .slice(0, 5);
    this.sunsetTime = new Date(this.sunset * 1000)
      .toLocaleTimeString([], { hour12: false })
      .slice(0, 5);
  };
}
