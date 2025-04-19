import pkg from "jsonwebtoken";
const { verify } = pkg;
const JWT_SECRET = process.env.JWT_SECRET;

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authorization token required",
    });
  }

  verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }
    req.user = payload;
    next();
  });
}

export { verifyJWT };
