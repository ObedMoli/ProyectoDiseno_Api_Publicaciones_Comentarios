import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = {
      ...decoded,
      user_id_bin: Buffer.from(decoded.user_id, 'hex') // ⚠️ agregado: user_id como BINARY
    };

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};