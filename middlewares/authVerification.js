const jwt = require("jsonwebtoken")

function authVerification(req, res, next) {
  const token = req.header("auth-token")
  if (!token) return res.status(401).send("Access denied")

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send("Invalid Token")
  }
}

module.exports = authVerification
