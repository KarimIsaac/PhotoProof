//verfiytoken.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("token"); // Get token from header
  if (!token)
    return res.status(401).json({ Message: "No authentication token found" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { _id: verified._id,}; // 
    next();
  } catch (err) {
    res.status(401).json({ Message: "Not a valid token" });
  }
};