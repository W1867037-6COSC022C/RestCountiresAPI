import db from "../config/db.js";

const { run } = db;
//import { run } from "../config/db.js";
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
async function generateApiKeyForUser(userId) {
  const apiKey = generateRandomApiKey();
  return await createApiKey({ userId: userId, api_key: apiKey });
}

/**
 * Get API keys for a specific user.
 */
async function getUserApiKeys(userId) {
  return await getApiKeysByUserId(userId);
}

/**
 * Updates API key of a user.
 *
 */
async function updateUserApiKey(userId, key_id, updates) {
  const key = await getApiKeyById(key_id);
  if (!key) throw new Error("API key not found");
  if (key.userId !== userId) throw new Error("Access denied: Not your API key");
  return await _updateApiKey(key_id, updates);
}

/**
 * Delete API key of a user
 */
async function deleteUserApiKey(userId, key_id) {
  const key = await getApiKeyById(key_id);
  if (!key) throw new Error("API key not found");
  if (key.userId !== userId) throw new Error("Access denied: Not your API key");
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
async function updateApiKey(key_id, updates) {
  const key = await getApiKeyById(key_id);
  if (!key) throw new Error("API key not found");
  return await _updateApiKey(key_id, updates);
}

/**
 * Deletes any API key.
 */
async function deleteApiKey(key_id) {
  const key = await getApiKeyById(key_id);
  if (!key) throw new Error("API key not found");
  return await _deleteApiKey(key_id);
}

/**
 * Logs usage of the API key - increments its usage count, then updates the last_used timestamp.
 */
async function logApiKeyUsage(key_id) {
  const sql = `UPDATE RC_UsersAPI SET usage_count = usage_count + 1, last_used = CURRENT_TIMESTAMP WHERE id = ?`;
  await run(sql, [key_id]);
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
