const { run, get, all } = require("../config/db");

async function createUser({ username, password, email, roleId }) {
  const sql = `
    INSERT INTO RC_Users (userName, password, email, roleId)
    VALUES (?, ?, ?, ?)
  `;
  const result = await run(sql, [username, password, email, roleId]);
  return { userId: result.lastID, username, email, roleId };
}

async function findUserByEmail(email) {
  const sql = `SELECT * FROM RC_Users WHERE email = ?`;
  return await get(sql, [email]);
}

async function findUserByUsername(userName) {
  const sql = `SELECT * FROM RC_Users WHERE userName = ?`;
  return await get(sql, [userName]);
}

async function getUserCount() {
  const sql = `SELECT COUNT(*) as count FROM RC_Users`;
  const result = await get(sql);
  return result.count;
}

async function findUserByUserId(id) {
  const sql = `SELECT userId, userName, email, roleId, created_at FROM RC_Users WHERE userId = ?`;
  return await get(sql, [id]);
}

async function findAllUsers() {
  const sql = `SELECT userId, userName, email, roleId, created_at FROM RC_Users`;
  return await all(sql);
}

async function updateUser(userId, updates) {
  let fields = [];
  let values = [];
  if (updates.email) {
    fields.push("email = ?");
    values.push(updates.email);
  }
  if (updates.password) {
    fields.push("password = ?");
    values.push(updates.password);
  }
  if (fields.length === 0) return null;
  const sql = `UPDATE RC_Users SET ${fields.join(", ")} WHERE userId = ?`;
  values.push(userId);
  await run(sql, values);
  return await findUserById(userId);
}

async function deleteUser(userId) {
  const sql = `DELETE FROM RC_Users WHERE userId = ?`;
  await run(sql, [userId]);
  return { userId };
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  getUserCount,
  findUserByUserId,
  findAllUsers,
  updateUser,
  deleteUser,
};
