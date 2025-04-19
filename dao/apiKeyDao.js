import dbUtils from "../config/db.js";
const { run, get, all } = dbUtils;

/**
 * Creates an API key record for each system user.
 * @param {Object} data - Contains userID and api_key of user.
 */
async function createApiKey({ userId, api_key }) {
  const sql = `INSERT INTO RC_UsersAPI (userId, api_key) VALUES (?, ?)`;
  const result = await run(sql, [userId, api_key]);
  // Return the newly created API key record.
  return await get(`SELECT * FROM RC_UsersAPI WHERE id = ?`, [result.lastID]);
}

/**
 * Retrieves an API key by  ID.
 */
async function getApiKeyById(id) {
  const sql = `SELECT * FROM RC_UsersAPI WHERE id = ?`;
  return await get(sql, [id]);
}

/**
 * Retrieves all API keys of a given user.
 */
async function getApiKeysByUserId(userId) {
  const sql = `SELECT * FROM RC_UsersAPI WHERE userId = ?`;
  return await all(sql, [userId]);
}

/**
 * Retrieves all admin based API keys
 */
async function getAllApiKeys() {
  const sql = `SELECT * FROM RC_UsersAPI`;
  return await all(sql);
}

/**
 * Updates an API key record for a given scenario
 */
async function updateApiKey(id, updates) {
  let fields = [];
  let values = [];
  if (updates.api_key !== undefined) {
    fields.push("api_key = ?");
    values.push(updates.api_key);
  }
  if (updates.active !== undefined) {
    fields.push("active = ?");
    values.push(updates.active);
  }
  if (updates.usage_count !== undefined) {
    fields.push("usage_count = ?");
    values.push(updates.usage_count);
  }
  if (updates.last_used !== undefined) {
    fields.push("last_used = ?");
    values.push(updates.last_used);
  }
  if (fields.length === 0) return null;

  const sql = `UPDATE RC_UsersAPI SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);
  await run(sql, values);
  return await getApiKeyById(id);
}

/**
 * Deletes an API key record.
 */
async function deleteApiKey(id) {
  const sql = `DELETE FROM RC_UsersAPI WHERE id = ?`;
  await run(sql, [id]);
  return { id };
}

/**
 * Finds an active API key by value.
 */
async function findApiKeyByValue(api_key) {
  const sql = `SELECT * FROM RC_UsersAPI WHERE api_key = ? AND active = 1`;
  return await get(sql, [api_key]);
}

export default {
  createApiKey,
  getApiKeyById,
  getApiKeysByUserId,
  getAllApiKeys,
  updateApiKey,
  deleteApiKey,
  findApiKeyByValue,
};
