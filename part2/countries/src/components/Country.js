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

    // console.log("Country data is ", countryData);


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

    // console.log(countryData);

    // Get geocoding for a country's capital
    useEffect(() => {
        
        if(countryData !== undefined){
            // console.log("Hello, useeffect running");
            weatherServices
            .getCoordinates(countryData.capital, 1)
            .then(geocoding => {
                setGeocoding(geocoding);
            })
        }
    }, [countryData])

    // console.log(geocoding[0].lat);

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

    // console.log(geocoding);
    console.log(weatherData);

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
                // countryList.length === 1 && countryData !== undefined ? 
                <>
                    {/* Basic country details */}
                    <h2>{countryData.name.common}</h2>
                    <div>
                        <p>{countryData.capital}</p>
                        <p>{countryData.area}</p>
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

                    {/* Weather data */}
                    <div>
                        <h3><strong>Weather in: {countryData.capital}</strong></h3>
                        <p>temperature: {weatherData.main.temp}</p>
                        <p>wind: {weatherData.wind.speed}</p>
                    </div>
                </> : 
                null
            }
        </>
    )

}

export default Country