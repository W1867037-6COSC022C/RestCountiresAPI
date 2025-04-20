import { findApiKeyByValue } from "../dao/apiKeyDao.js";

async function authenticateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({ message: "API key required" });
  }
  try {
    const keyRecord = await findApiKeyByValue(apiKey);
    if (!keyRecord) {
      return res.status(403).json({ message: "Invalid or inactive API key" });
    }

    req.apiKey = keyRecord; //for future reference
    next();
  } catch (err) {
    next(err);
  }
}

export { authenticateApiKey };
