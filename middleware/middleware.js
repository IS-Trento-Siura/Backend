import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded; 
    req.user = {
      _id: decoded._id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
    };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};


export const requireOrg = (req, res, next) => {
  if (req.user?.role !== 'org') { //checks for org types?
    return res.status(403).json({ error: 'Access denied: admin only' });
  }
  next();
};