import countryHandler from "../service/restCountryHandler.js";
import apiKeyHandler from "../service/apiKeyHandler.js";

/**
 * Retrieves information about all countries.
 */
const getAllCountries = async (req, res) => {
  try {
    const countries = await countryHandler.getAllCountries();
    await apiKeyHandler.logApiKeyUsage(req.apiKey.id);
    res.json(countries);
  } catch (err) {
    res.status(500).json({
      message: "restCountries Server Error: get All countires",
      error: err.message,
    });
  }
};

/**
 * Retrieves information for a specific country by name.
 */
const getCountryByName = async (req, res) => {
  try {
    const name = req.params.name;
    const countries = await countryHandler.getCountryByName(name);
    await apiKeyHandler.logApiKeyUsage(req.apiKey.id);
    res.json(countries);
  } catch (err) {
    res.status(500).json({
      message: "restCountries Server Error: get country by name",
      error: err.message,
    });
  }
};

export { getAllCountries, getCountryByName };
