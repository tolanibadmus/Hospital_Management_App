const jwt = require('jsonwebtoken')

function authMiddleware (req, res, next) {
  const token = req.cookies.token
  const jwtSecret = process.env.JWT_SECRET
  if (!token) {
    return res.redirect('/login')
  }
  try {
    jwt.verify(token, jwtSecret);
  } catch(err) {
    return res.redirect('/login')
  }
  return next()
}

module.exports = authMiddleware