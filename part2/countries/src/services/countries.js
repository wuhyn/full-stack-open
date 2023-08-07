import axios from "axios";
const countryNameAll = "https://studies.cs.helsinki.fi/restcountries/api/all";
const countryNameUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

const getAllCountryList = () => {
    const request = axios.get(countryNameAll);
    return request.then(response => response.data);
}

const getCountryData = (countryName) => {
    const request = axios.get(`${countryNameUrl}/${countryName}`);
    return request.then(response => response.data);
}

const services = {
    getAllCountryList,
    getCountryData,
}

export default services;