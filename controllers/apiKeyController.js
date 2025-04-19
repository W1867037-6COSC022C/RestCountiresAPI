// controllers/apiKeyController.js
const apiKeyHandler = require("../services/apiKeyHandler");

/* ----- User Endpoints ----- */

const generateApiKey = async (req, res) => {
  const userId = req.user.id;
  const newAPIKey = await apiKeyHandler.generateApiKeyForUser(userId);
  res.status(201).json(newAPIKey);
};

// Retrieves all API keys for the current user.
const getMyApiKeys = async (req, res) => {
  const userId = req.user.id;
  const keys = await apiKeyHandler.getUserApiKeys(userId);
  res.json(keys);
};

// Updates API key for the current user.
const updateMyApiKey = async (req, res) => {
  const userId = req.user.id;
  const keyId = req.params.id;
  const updates = req.body;
  const updatedKey = await apiKeyHandler.updateUserApiKey(
    userId,
    keyId,
    updates
  );
  res.json(updatedKey);
};

// Deletes an API key for the current user.
const deleteMyApiKey = async (req, res) => {
  const userId = req.user.id;
  const keyId = req.params.id;
  await apiKeyHandler.deleteUserApiKey(userId, keyId);
  res.json({ message: "API key deleted successfully" });
};

/* --- Admin Endpoints --- */

// Retrieves all API keys across all users - admin restricted feature
const adminGetAllApiKeys = async (req, res) => {
  if (req.user.role !== 1) {
    return res.status(403).json({ message: "Access Denied" });
  }
  const keys = await apiKeyHandler.adminGetAllApiKeys();
  res.json(keys);
};

// Updates any API key - admin restricted feature
const adminUpdateApiKey = async (req, res) => {
  if (req.user.role !== 1) {
    return res.status(403).json({ message: "Access Denied" });
  }
  const keyId = req.params.id;
  const updates = req.body;
  const updatedKey = await apiKeyHandler.adminUpdateApiKey(keyId, updates);
  res.json(updatedKey);
};

// Deletes any API key - admin restricted feature
const adminDeleteApiKey = async (req, res) => {
  if (req.user.role !== 1) {
    return res.status(403).json({ message: "Access Denied" });
  }
  const keyId = req.params.id;
  await apiKeyHandler.adminDeleteApiKey(keyId);
  res.json({ message: "API key deleted successfully" });
};

module.exports = {
  generateApiKey,
  getMyApiKeys,
  updateMyApiKey,
  deleteMyApiKey,

  adminGetAllApiKeys,
  adminUpdateApiKey,
  adminDeleteApiKey,
};
