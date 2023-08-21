// @ts-nocheck
import React, { useEffect, useState } from "react";
import services from "services/countries";
import weatherServices from "services/weather";

const Country = ({countryList}) => {
    const [countryName, setCountryName] = useState('');
    const [countryData, setCountryData] = useState();
    const [showDetail, setShowDetail] = useState(false);
    const [geocoding, setGeocoding] = useState();
    const [weatherData, setWeatherData] = useState();

    // Load a country's details if there's only one country provided from the search function
    useEffect(() => {
        if(countryList.length === 1){
            setCountryName(countryList[0].name.common);
            setShowDetail(true);
        }
    },[countryList])

    // Load details for a single country
    useEffect(() => {
        if(countryName !== ''){
            services
            .getCountryData(countryName)
            .then(countryInfo => {
                setCountryData(countryInfo);
            })
        }
    },[countryName])

    // Get geocoding for a country's capital
    useEffect(() => {
        if(countryData !== undefined){
            weatherServices
            .getCoordinates(countryData.capital, 1)
            .then(geocoding => {
                setGeocoding(geocoding);
            })
        }
    }, [countryData])

    // Get current weather 
    useEffect(() => {
        if(geocoding !== undefined){
            weatherServices 
            .getCurrentWeather(geocoding[0].lat, geocoding[0].lon)
            .then(data => {
                setWeatherData(data);
            })
        }
    }, [geocoding])

    // Onclick - Sets the country name and displays the country details
    const showCountryDetail = (countryName) => {
        setCountryName(countryName);
        setShowDetail(true);
    }

    return (
        <>
            {/* Search result warning */}
            {
            countryList.length > 10 && showDetail === false ? 
            <p>Too many matches, specify another filter</p> : 
            null
            }

            {/* Display a list of countries */}
            {
            (countryList.length > 1 && countryList.length <= 10) && showDetail === false ? 
            countryList.map((country) => (
                <div className="country-list">
                    <p>{country.name.common}</p>
                    <button onClick={() => showCountryDetail(country.name.common)}>show</button>
                </div>
            )) : 
            null
            }

            {/* Display detailed information for a country */}
            {
                showDetail && countryData !== undefined ?
                <>
                    {/* Basic country details */}
                    <h2>{countryData.name.common}</h2>
                    <div>
                        <p>capital {countryData.capital}</p>
                        <p>area {countryData.area}</p>
                    </div>
                    <div>
                        <p><strong>languages:</strong></p>
                        <ul>
                            {
                                Object.values(countryData.languages).map((language, idx) => (
                                    <li key={idx}>{language}</li>
                                ))
                                
                            }
                        </ul>
                    </div>
                    <div>
                        {
                            <img src={countryData.flags.png} alt={countryData.flags.alt} />
                        }
                    </div>

                    {/* Display weather details*/}
                    <div>
                        <h3><strong>Weather in: {countryData.capital}</strong></h3>
                        <p>{geocoding !== undefined ? geocoding[0].name : 'loading'}</p>
                        <p>temperature {weatherData !== undefined ? `${weatherData.main.temp} Celsius` : 'loading'}</p>
                        <img src={weatherData !== undefined ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` : 'loading'} alt="" />
                        <p>wind: {weatherData !== undefined ? `${weatherData.wind.speed} m/s` : 'loading'}</p>
                    </div>
                </> : 
                null
            }
        </>
    )

}

export default Country