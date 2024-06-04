import jwt from 'jsonwebtoken';

// Secret key for JWT signing and verification
const secret = process.env.JWT_SECRET || 'your_secret_key';

// Middleware function to authenticate users
export function authMiddleware({ req }) {
  // Get the token from the request headers
  let token = req.headers.authorization || '';

  // Remove 'Bearer ' from the token string if it exists
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  // Initialize the user context to null
  let user = null;

  // Verify the token if it exists
  if (token) {
    try {
      // Decode the token and attach user information to the context
      user = jwt.verify(token, secret);
    } catch (err) {
      console.error('Token verification error:', err);
    }
  }

  // Attach user information to the request context
  return { user };
}
