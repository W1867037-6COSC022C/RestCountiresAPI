const countryHandler = require("../service/restCountryHandler");
const apiKeyHandler = require("../service/apiKeyHandler");

/**
 * Retrieves information about all countries.
 */
const getAllCountries = async (req, res) => {
  const countries = await countryHandler.getAllCountries();
  await apiKeyHandler.logApiKeyUsage(req.apiKey.id);
  res.json(countries);
};

/**
 * Retrieves information for a specific country by name.
 */
const getCountryByName = async (req, res) => {
  const name = req.params.name;
  const countries = await countryHandler.getCountryByName(name);
  await apiKeyHandler.logApiKeyUsage(req.apiKey.id);
  res.json(countries);
};

module.exports = {
  getAllCountries,
  getCountryByName,
};
