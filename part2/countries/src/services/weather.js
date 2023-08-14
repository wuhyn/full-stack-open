import axios from "axios";
const geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?"

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q=Helsinki&limit=1&appid=0a774a8cca240819993b2330a57be33d

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const getCoordinates = (cityName, limit) => {
    const url = `${geocodingUrl}q=${cityName}&limit=${limit}&appid=${process.env.REACT_APP_API_KEY}`;
    const request = axios.get(url);
    return request.then(response => response.data);
}

const getCurrentWeather = (lat, lon) => {
    const url = `${weatherApiUrl}lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`;
    // console.log(url);
    const request = axios.get(url);
    return request.then(response => response.data);
}

const weatherServices = {
    getCoordinates,
    getCurrentWeather
}

export default weatherServices;