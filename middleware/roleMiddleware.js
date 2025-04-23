const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role;  // The role is set by the authMiddleware after verifying the token
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ msg: "Access denied. You do not have permission to access this resource." });
      }
      
      next();
    };
  };
  
  module.exports = roleMiddleware;
  