# Country App

## Functionality
The Country App features a simple search bar that will allow users to search for and display detailed information about a country.

The search bar is based on a wildcard search pattern:
- If there are more than 10 countries matching the search pattern, it will not display a warning message.
- If there are 10 or less countries, it will display a list of 10 countries matching the search pattern and button to display that country's detailed information.
- If there is exactly one country, it will display a country's detailed information

## Detailed information of a country
The Country App will show a country's details including the capital city, the country area code, a list of spoken languages and the weather of the capital city.

External API utilised:

- University of Helsinki REST Countries API
  - https://studies.cs.helsinki.fi/restcountries/api/all
  - https://studies.cs.helsinki.fi/restcountries/api/name/{name}
- OpenWeatherMap API
  - Geocoding API: https://openweathermap.org/api/geocoding-api
  - Current weather API: https://openweathermap.org/current
  - Custom weather icon: https://openweathermap.org/weather-conditions#Icon-list

## Pre-requisite
This project utilizes a .env environmental variable file to function correctly, a custom API key for the OpenWeatherMap API utilised above can be generated from [OpenWeatherMap.](https://home.openweathermap.org/api_keys)

Note: University of Helsinki's API does not require a custom API key.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
