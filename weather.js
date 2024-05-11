const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const path = require('path')

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/weather', async (req, res) => {
  try {
    let { lat, lon, location } = req.query;

    if (location) {
      const coordinates = await geocodeLocation(location);
      lat = coordinates.lat;
      lon = coordinates.lon;
    }

    const weatherData = await getWeatherData(lat, lon);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error('Error location:', error.message);
  }
});

async function geocodeLocation(location) {
  const geocodingAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&appid=dc35e51030c28cae5e8a2ee06a7224f8`;
  try {
    const response = await axios.get(geocodingAPI);
    console.log("r", response.data[0])
    const { lat, lon } = response.data[0]; 

    return { lat, lon };
  } catch (error) {
    // Handle errors (e.g., API request failed, invalid location, etc.)
    console.error('Error geocoding location:', error.message);
    throw new Error('Failed to geocode location');
  }
}

async function getWeatherData(lat, lon) {
  const response = await axios.get('https://api.met.no/weatherapi/locationforecast/2.0/compact', {
    headers: {
      'User-Agent': 'https://github.com/adebusola-prog', // Specify your User-Agent
    },
    params: {
      lat,
      lon
    },
  });
  return response.data;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});