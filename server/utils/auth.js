const jwt = require('jsonwebtoken');

// Secret key for JWT signing and verification
const secret = process.env.JWT_SECRET || 'your_secret_key';

// Middleware function to authenticate users
function authMiddleware({ req }) {
  // Get the token from the request headers
  let token = '';
  let user = null;

  if (req.headers) {
    token = req.headers.authorization || '';

    // Remove 'Bearer ' from the token string if it exists
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token if it exists
    if (token) {
      try {
        // Decode the token and attach user information to the context
        user = jwt.verify(token, secret);
      } catch (err) {
        console.error('Token verification error:', err);
      }
    }
  } else {
    // Handle the case where req.headers is undefined
    console.log('Request headers are undefined, skipping authentication');
  }

  // Attach user information to the request context
  return { user };
}

module.exports = { authMiddleware };