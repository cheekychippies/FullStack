import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryData from './components/countryData'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [message, setMessage] = useState('')
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY


  const fetchCountryDetails = (countryName) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
      .then(response => {
        const countryData = response.data
        setCountry(countryData)
        setCountries([])
        setMessage('')

        // Fetch lat lon for weather
        const lat = countryData.capitalInfo.latlng[0]
        const lon = countryData.capitalInfo.latlng[1]
        fetchWeather(lat, lon)
      })
      .catch(error => {
        console.error('Error fetching country data:', error)
      })
  }
  const fetchWeather = (lat, lon) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then(weatherResponse => {
        console.log('Weather data:', weatherResponse.data)
        setWeather(weatherResponse.data)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error)
      })
  }

  useEffect(() => {
    if (value) {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(value.toLowerCase())
          )
          if (filteredCountries.length > 10) {
            setMessage('Too many matches, specify another filter')
            setCountries([])
            setCountry(null)
          } else if (filteredCountries.length === 0) {
            setMessage('No countries found')
            setCountries([])
            setCountry(null)
          } else if (filteredCountries.length === 1) {
            fetchCountryDetails(filteredCountries[0].name.common)
          } else {
            setMessage('')
            setCountries(filteredCountries)
            setCountry(null)
          }
        })
        .catch(error => {
          console.error('Error fetching countries:', error)
        })
    } else {
      setMessage('')
      setCountries([])
      setCountry(null)
    }
  }, [value])

  const handleCountrySelect = (selectedCountry) => {
    fetchCountryDetails(selectedCountry.name.common)
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }


  return (
    <div>
      <form>
        country: <input value={value} onChange={handleChange} />
      </form>
      {message && <p>{message}</p>}
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>{country.name.common}{' '}
            <button onClick={() => handleCountrySelect(country)}>Show Details</button>
          </li>
        ))}
      </ul>
      <CountryData country={country} weather={weather} />
    </div>
  )
}

export default App