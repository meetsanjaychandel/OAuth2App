import jwt from "jsonwebtoken"
import { User } from '../models/user.models.js';

const authMiddleware = {
  ensureAuthenticated: (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Permission denied' });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export {authMiddleware};
