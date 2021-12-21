import * as helpers from "../helpers";

export default class Day {
  constructor(
    dateTime,
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description
  ) {
    this.low = low;
    this.high = high;
    this.precipitation = precipitation;
    this.dateTime = dateTime;
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.description = description;
  }

  // convertSunrise = () => {
  //   this.sunriseTime = new Date(this.sunrise * 1000)
  //     .toLocaleTimeString([], { hour12: false })
  //     .slice(0, 5);
  // };

  // convertSunset = () => {
  //   this.sunsetTime = new Date(this.sunset * 1000)
  //     .toLocaleTimeString([], { hour12: false })
  //     .slice(0, 5);
  // };
  convertSuntime = (time) => {
    return new Date(time * 1000)
      .toLocaleTimeString([], { hour12: false })
      .slice(0, 5);
  };
}
