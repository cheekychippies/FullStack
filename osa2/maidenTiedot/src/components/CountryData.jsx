
const CountryData = ({ country }) => {

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
        </div>
    )
}
export default CountryData