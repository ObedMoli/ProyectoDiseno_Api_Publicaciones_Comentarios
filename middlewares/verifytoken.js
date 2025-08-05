import jwt from 'jsonwebtoken';
import { unauthorized, forbidden } from '../utils/utils.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json(unauthorized('Token no proporcionado'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contiene user_id
    next();
  } catch (error) {
    return res.status(403).json(forbidden('Token inválido o expirado'));
  }
};
