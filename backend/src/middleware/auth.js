const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware: verifies the JWT from the HTTP-only cookie
// Attach to any route that requires a logged-in user
const protect = async (req, res, next) => {
  try {
    // Read token from cookie (set at login/register)
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated. Please log in.',
      });
    }

    // Verify signature and expiry
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request — exclude password even though select:false covers it
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    // jwt.verify throws on invalid/expired tokens
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please log in again.',
    });
  }
};

// Optional middleware: restrict to specific roles
// Usage: router.get('/admin', protect, restrictTo('admin'), handler)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.',
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };
