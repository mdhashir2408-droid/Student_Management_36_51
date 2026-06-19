/**
 * Middleware to restrict access based on user roles
 * @param {...string} roles - List of allowed roles (e.g., 'admin', 'teacher', 'student')
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Note: req.user and req.user.role should be populated by the protect middleware.
    // In a placeholder, we assume req.user might be updated or verified.
    if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: Access is restricted to roles: [${roles.join(', ')}]`
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };
