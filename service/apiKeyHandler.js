import { run } from "../config/db";
import { randomBytes } from "crypto";
import {
  createApiKey,
  getApiKeysByUserId,
  getApiKeyById,
  updateApiKey as _updateApiKey,
  deleteApiKey as _deleteApiKey,
  getAllApiKeys as _getAllApiKeys,
} from "../dao/apiKeyDao.js";

/**
 * Generates API key using 16 random bytes by converting to a hexadecimal string.
 * There will be 32 hex characters for each
 */
function generateRandomApiKey() {
  return randomBytes(16).toString("hex");
}

/**
 * Generates and store a new API key for given user
 */
async function generateApiKeyForUser(userID) {
  const apiKey = generateRandomApiKey();
  return await createApiKey({ userID: userID, api_key: apiKey });
}

/**
 * Get API keys for a specific user.
 */
async function getUserApiKeys(userID) {
  return await getApiKeysByUserId(userID);
}

/**
 * Updates API key of a user.
 *
 */
async function updateUserApiKey(userID, key_id, updates) {
  const key = await getApiKeyById(key_id);
  if (!key) throw new Error("API key not found");
  if (key.userID !== userID) throw new Error("Access denied: Not your API key");
  return await _updateApiKey(key_id, updates);
}

/**
 * Delete API key of a user
 */
async function deleteUserApiKey(user_id, key_id) {
  const key = await getApiKeyById(key_id);
  if (!key) throw new Error("API key not found");
  if (key.user_id !== user_id)
    throw new Error("Access denied: Not your API key");
  return await _deleteApiKey(key_id);
}

/* --- Admin Functions --- */

/**
 * Retrieves all API keys from the db.
 */
async function getAllApiKeys() {
  return await _getAllApiKeys();
}

/**
 * Updates any API key.
 */
async function updateApiKey(keyId, updates) {
  const key = await getApiKeyById(keyId);
  if (!key) throw new Error("API key not found");
  return await _updateApiKey(keyId, updates);
}

/**
 * Deletes any API key.
 */
async function deleteApiKey(keyId) {
  const key = await getApiKeyById(keyId);
  if (!key) throw new Error("API key not found");
  return await _deleteApiKey(keyId);
}

/**
 * Logs usage of the API key - increments its usage count, then updates the last_used timestamp.
 */
async function logApiKeyUsage(keyId) {
  const sql = `UPDATE api_keys SET usage_count = usage_count + 1, last_used = CURRENT_TIMESTAMP WHERE id = ?`;
  await run(sql, [keyId]);
}
export default {
  generateApiKeyForUser,
  getUserApiKeys,
  updateUserApiKey,
  deleteUserApiKey,
  getAllApiKeys,
  updateApiKey,
  deleteApiKey,
  logApiKeyUsage,
};
