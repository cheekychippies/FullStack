import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryData from './components/countryData'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [message, setMessage] = useState('')
  const [country, setCountry] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY
  console.log(api_key)

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
            setMessage('No coutries found')
            setCountries([])
            setCountry(null)
          } else if (filteredCountries.length === 1) {

            axios
              .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0].name.common}`)
              .then(response => {
                setCountry(response.data)
                setCountries([])
                setMessage('')
              })

          }
          else {
            setMessage('')
            setCountries(filteredCountries)
            setCountry(null)
          }

        })
    } else {
      setCountries([])
      setMessage('')
    }
  }, [value])

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
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
      <CountryData country={country} />
    </div>
  )
}

export default App