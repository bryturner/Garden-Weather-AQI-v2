import * as helpers from '../helpers';

export default class Day {
  constructor(
    dateTime,
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description,
    weatherId,
    weatherMain
  ) {
    this.dateTime = dateTime;
    this.low = low;
    this.high = high;
    this.precipitation = precipitation;
    this.sunrise = sunrise;
    this.sunset = sunset;
    this.description = description;
    this.weatherId = weatherId;
    this.weatherMain = weatherMain;
  }

  _formatTemp = temp => {
    return Math.trunc(temp);
  };

  getLowTemp() {
    return this._formatTemp(this.low);
  }

  getHighTemp() {
    return this._formatTemp(this.high);
  }

  getPrecipitation() {
    return Math.trunc(this.precipitation * 100);
  }

  _convertToTime = time => {
    return new Date(time * 1000)
      .toLocaleTimeString([], { hour12: false })
      .slice(0, 5);
  };

  getSunrise() {
    return this._convertToTime(this.sunrise);
  }

  getSunset() {
    return this._convertToTime(this.sunset);
  }

  _formatDescription(description) {
    const firstLettersUpper = description
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return firstLettersUpper;
  }

  getDescription() {
    // Special cases from API are handled by hard-coding.
    if (this.weatherMain === 'Thunderstorm') return 'Thunderstorm';

    if (this.weatherMain === 'Drizzle') return 'Drizzle';

    if (this.weatherId > 519 && this.weatherId < 531) return 'Shower Rain';

    if (this.weatherMain === 'Clouds') {
      //Remove the colon from all cloud descriptions
      const cloudDescriptSplit = this.description.split(':');
      return this._formatDescription(cloudDescriptSplit[0]);
    }

    return this._formatDescription(this.description);
  }

  getWeatherIcon() {
    // Use the OpenWeather API descriptions (this.weatherMain) and ids (this.weatherId) to determine which weather icon should be displayed. **The strings being returned are the file names of the icon svg

    // Check to see if it is dark in the current location in order to display night icons
    if (this.dateTime < this.sunrise || this.dateTime > this.sunset) {
      if (this.weatherId === 500) return 'night-light-rain';
      if (this.weatherId === 800) return 'night-clear';
      if (this.weatherId === 801 || this.weatherId === 802)
        return 'night-partly-cloudy';
    }

    // Display icons for other unique weather occurances
    if (this.weatherId === 500) return 'light-rain';

    if (this.weatherId === 801 || this.weatherId === 802)
      return 'partly-cloudy';

    if (this.weatherMain === 'Dust' || this.weatherMain === 'Sand')
      return 'sand-dust';

    if (this.weatherMain === 'Smoke' || this.weatherMain === 'Fog')
      return 'fog-smoke';
    // All other svg icon file names and Openweather API weather condition titles match and can be used to display the correct icon

    return this.weatherMain;
  }
}
