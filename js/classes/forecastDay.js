class ForecastDay {
  constructor(
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description,
    aqi,
    morningTemp,
    eveningTemp,
    dayTemp
  ) {
    super(low, high, precipitation, sunrise, sunset, description, aqi);
    this.morningTemp = morningTemp;
    this.eveningTemp = eveningTemp;
    this.dayTemp = dayTemp;
  }
}
