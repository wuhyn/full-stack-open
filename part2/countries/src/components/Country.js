// @ts-nocheck
import React, { useEffect, useState } from "react";
import services from "services/countries";

const Country = ({countryList}) => {
    const [countryName, setCountryName] = useState('');
    const [countryData, setCountryData] = useState();
    const [showDetail, setShowDetail] = useState(false);

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
                </> : 
                null
            }
        </>
    )

}

export default Country