class CurrentDay extends Day {
  constructor(
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description,
    aqi,
    currentTemp,
    feelsLike
  ) {
    super(low, high, precipitation, sunrise, sunset, description, aqi);
    this.currentTemp = currentTemp;
    this.feelsLike = feelsLike;
  }
}
