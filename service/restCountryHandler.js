const axios = require("axios");

/**
 * Extracts required fields (name, capital of country, currencies, languages, flag) from a country object.
 */
function getRequiredCountryData(country) {
  return {
    name: country.name?.common || null,
    capital: country.capital ? country.capital[0] : null,
    currencies: country.currencies,
    languages: country.languages,
    flag: country.flags?.png || country.flags?.svg || null,
  };
}

/**
 * can be used to eetrieve data of all countries avaialble
 */
async function getAllCountries() {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  if (response.status !== 200) {
    throw new Error("Error fetching countries");
  }
  const countries = response.data;
  return countries.map(getRequiredCountryData);
}

/**
 * retrieves data for countries based on the passed country name
 */
async function getCountryByName(countryName) {
  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
  );
  if (response.status !== 200) {
    throw new Error(`Error fetching ${countryName} country info`);
  }
  const countries = response.data;
  return countries.map(getRequiredCountryData);
}

module.exports = {
  getAllCountries,
  getCountryByName,
};
