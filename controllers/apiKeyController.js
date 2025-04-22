import apiKeyHandler from "../service/apiKeyHandler.js";

/* ----- User Endpoints ----- */

const generateApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const newAPIKey = await apiKeyHandler.generateApiKeyForUser(userId);
    res.json({ message: "API generated Successfully", data: newAPIKey });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while generating an API",
      error: err.message,
    });
  }
};

// Retrieves all API keys for the current user.
const getMyApiKeys = async (req, res) => {
  try {
    const userId = req.user.id;
    const keys = await apiKeyHandler.getUserApiKeys(userId);
    res.status(200).json({ message: "recieved all user API keys", data: keys });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during retrieving user-centric API keys",
      error: err.message,
    });
  }
};

// Updates API key for the current user.
const updateMyApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const keyId = req.params.id;
    const updates = req.body;
    const updatedKey = await apiKeyHandler.updateUserApiKey(
      userId,
      keyId,
      updates
    );
    res.json(updatedKey);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during updating API key",
      error: err.message,
    });
  }
};

// Deletes an API key for the current user.
const deleteMyApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const keyId = req.params.id;
    await apiKeyHandler.deleteUserApiKey(userId, keyId);
    res.json({ message: "API key deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while deleting API key",
      error: err.message,
    });
  }
};

/* --- Admin Endpoints --- */

// Retrieves all API keys across all users - admin restricted feature
const adminGetAllApiKeys = async (req, res) => {
  try {
    if (req.user.role !== 1) {
      return res.status(403).json({ message: "Access Denied" });
    }
    const keys = await apiKeyHandler.getAllApiKeys();
    res.json({ message: "API keys of users", data: keys });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during recieving users' APIs",
      error: err.message,
    });
  }
};

// Updates any API key - admin restricted feature
const adminUpdateApiKey = async (req, res) => {
  try {
    if (req.user.role !== 1) {
      return res.status(403).json({ message: "Access Denied" });
    }
    const keyId = req.params.id;
    const updates = req.body;
    const updatedKey = await apiKeyHandler.updateApiKey(keyId, updates);
    res.json(updatedKey);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during updating selected API ",
      error: err.message,
    });
  }
};

// Deletes any API key - admin restricted feature
const adminDeleteApiKey = async (req, res) => {
  try {
    if (req.user.role !== 1) {
      return res.status(403).json({ message: "Access Denied" });
    }
    const keyId = req.params.id;
    await apiKeyHandler.deleteApiKey(keyId);
    res.json({ message: "API key deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during deleting API",
      error: err.message,
    });
  }
};

export default {
  generateApiKey,
  getMyApiKeys,
  updateMyApiKey,
  deleteMyApiKey,

  adminGetAllApiKeys,
  adminUpdateApiKey,
  adminDeleteApiKey,
};
