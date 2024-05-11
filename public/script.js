document.addEventListener('DOMContentLoaded', function() {
  const getWeatherBtn = document.getElementById('getWeatherBtn');
  const locationInput = document.getElementById('location');
  const weatherDataContainer = document.getElementById('weatherData');

  getWeatherBtn.addEventListener('click', async function() {
    const location = locationInput.value.trim();

    if (!location) {
      alert('Please enter a location');
      return;
    }

    try {
      const weatherData = await fetchWeatherData(location);
      displayWeatherData(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      alert('Failed to fetch weather data');
    }
  });

  async function fetchWeatherData(location) {
    const response = await fetch(`/weather?location=${encodeURIComponent(location)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  }

  function displayWeatherData(weatherData) {
    const { air_temperature, wind_speed, relative_humidity, 
      air_pressure_at_sea_level, cloud_area_fraction, wind_from_direction} = weatherData.properties.timeseries[0].data.instant.details;
    weatherDataContainer.innerHTML = `
      <h2>Weather Data</h2>
      <p>Temperature: ${air_temperature}°C</p>
      <p>Wind Speed: ${wind_speed}m/s</p>
      <p>Humidity: ${relative_humidity}%</p>
      <p>Wind from Direction: ${wind_from_direction}degrees</p>
      <p>Air Pressure at Sea Level: ${air_pressure_at_sea_level}hPa</p>
      <p>Cloud Area Fraction: ${cloud_area_fraction}%/p>

    `;
  }
});

