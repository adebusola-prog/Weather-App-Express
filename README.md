Weather App
This is a simple web application built with Node.js and Express.js that retrieves weather data from the Yr.no API for a given location and displays it to the user. 
The application also includes rate limiting to prevent overload of requests to the API.

Installation
git clone https://github.com/yourusername/weather-app.git

cd weather-app
npm install

start the server
npm start

Open a web browser and navigate to http://localhost:3000/index.html to access the application.
Enter a location in the provided input field and click the "Get Weather" button to retrieve weather data for that location.

Dependencies
Express: Fast, unopinionated, minimalist web framework for Node.js.
axios: Promise-based HTTP client for the browser and Node.js.
express-rate-limit: Basic rate-limiting middleware for Express.

API Used
Yr.no API: Meteorological service providing weather data.
