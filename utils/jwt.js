const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");

const JWT_SECRET = process.env.JWT_SECRET;

module.export.getToken = (info) => {
  const token = jwt.sign(info, JWT_SECRET);
  return token;
};

module.export.decodeJWT = (token) => {
  const decodedToken = decode(token);
  return decodedToken;
};
