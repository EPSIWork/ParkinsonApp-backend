import jwt from 'jsonwebtoken';
import { config } from '../../../../config/config';

export const generateToken = (data: any) => {
  return jwt.sign(data, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION_TIME,
  });
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
}

