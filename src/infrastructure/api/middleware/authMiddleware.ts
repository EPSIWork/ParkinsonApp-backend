import { Response, NextFunction } from 'express';
import { ServerHandler } from '../utils/ServerHandler';
import { AuthenticatedRequest } from '../utils/requestWithUser';
import { verifyToken } from '../helpers/crypto/jwt';




export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Get the token from the 'Authorization' header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return ServerHandler.sendResponse(res, 401, { auth: false, message: 'No token provided.'});
  }
  try {
    const decoded = verifyToken(token);
    if (!decoded) {
        return ServerHandler.sendResponse(res, 401, { auth: false, message: 'Failed to authenticate token.'});
    }
    req.user = decoded;
    next();
  } catch (err) {
    return ServerHandler.sendResponse(res, 403, { auth: false, message: 'Failed to authenticate token.'});
  }
};

export const authAdminMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Get the token from the 'Authorization' header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return ServerHandler.sendResponse(res, 401, { auth: false, message: 'No token provided.'});
  }
  try {
    const decoded : any = verifyToken(token);
    if (!decoded) {
      return ServerHandler.sendResponse(res, 401, { auth: false, message: 'Failed to authenticate token.'});
    }
    req.user = decoded;
    if (decoded.user.role !== 'admin') {
      return ServerHandler.sendResponse(res, 403, { auth: false, message: 'You don\'t have permission to access this resource.'});
    }
    next();
  } catch (err) {
    return ServerHandler.sendResponse(res, 403, { auth: false, message: 'Failed to authenticate token.'});
  }
};