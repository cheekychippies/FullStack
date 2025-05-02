
const CountryData = ({ country, weather }) => {

    if (!country) {
        return null
    }
    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150"></img>
            {weather && (
                <div>
                    <h1>Weather in {country.capital}</h1>
                    <p>Temperature {weather.main.temp} °C</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" width="100" ></img>
                    <p>Wind speed: {weather.wind.speed} m/s</p>
                </div>
            )}

        </div>

    )
}
export default CountryData