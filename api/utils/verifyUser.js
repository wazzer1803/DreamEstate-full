import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  const SECRET_KEY="HAPPYDAPPY"
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
  
    next();
  });
};