// @ts-nocheck
import React, { useEffect, useState } from "react";
import services from "services/countries";

const Country = ({countryList}) => {
    const [countryName, setCountryName] = useState('');
    const [countryData, setCountryData] = useState();

    // Load a country's details if there's only one country provided from the search function
    useEffect(() => {
        if(countryList.length === 1){
            setCountryName(countryList[0].name.common);
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

    if(countryList.length > 10){
        return <p>Too many matches, specify another filter</p>;
    } else if(countryList.length > 1 && countryList.length <= 10){
        return(countryList.map((country) => <p>{country.name.common}</p>)
        )
    } 
    else if(countryList.length === 1){
        if(countryData !== undefined){
            return (
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
                </>
            )
        }

        console.log(countryData);
        
       
    }
}

export default Country