import axios from "axios";
const geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?"

const getCoordinates = (cityName, limit) => {
    const url = `${geocodingUrl}q=${cityName}&limit=${limit}&appid=${process.env.REACT_APP_API_KEY}`;
    const request = axios.get(url);
    console.log("Geocoding url", url);
    return request.then(response => response.data);
}

const getCurrentWeather = (lat, lon) => {
    const url = `${weatherApiUrl}lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    const request = axios.get(url);
    console.log("Weather url", url);
    return request.then(response => response.data);
}

const weatherServices = {
    getCoordinates,
    getCurrentWeather
}

export default weatherServices;