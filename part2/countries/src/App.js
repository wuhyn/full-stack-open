import React, { useEffect, useState } from 'react';
import services from 'services/countries';
import './App.css';
import Country from 'components/Country';

const App = () => {
  // useState
  const [value, setValue] = useState();
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  // const [countryData, setCountryData] = useState([]);

  // On page refresh, load a list of countries into the countryList state variable
  useEffect(() => {
    services
      .getAllCountryList()
      .then(countryList => {
        // console.log(countryList);
        setCountryList(countryList);
      })
  }, [])

  // Handle change
  const handleChange = (event) => {
    // console.log(event.target.value);
    setValue(event.target.value);
  }

  // Handle search
  const onSearch = (event) => {
    event.preventDefault();
   
    setCountry(value);
  }

  // Filter list of countries based on search
  const filterCountry = country !== '' ?
                        countryList.filter(countryList => countryList.name.common.toLowerCase().includes(country.toLowerCase())):
                        countryList;

  // console.log(filterCountry);

  return (
    <>
      <form onSubmit={onSearch}>
        find countries: <input value={value} onChange={handleChange}/>
      </form>
      <Country countryList={filterCountry}/>
    </>
  );
}

export default App;
