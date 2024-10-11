import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UserUseCase } from '../../../application/use_cases/UserUseCase';
import { UserRepository } from '../../db/repositories/UserRepository';
import { CustomError, ServerHandler } from '../utils/ServerHandler';
import {AuthenticatedRequest} from "../utils/requestWithUser";

/**
 * UserController class.
 * This class handles the HTTP requests related to User operations.
 */
export class UserController {
  private userUseCase = new UserUseCase(new UserRepository());

  /**
   * Registers a new user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async register(req: Request, res: Response) {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return ServerHandler.sendResponse(res, 400, { errors: errors.array() });
        }
        const { password, ...userWithoutPassword } = await this.userUseCase.register(req.body);
        return ServerHandler.sendResponse(res, 201, userWithoutPassword);
    } catch (error){
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    }
  }

  /**
   * Confirms a user's email.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async confirmEmail(req: Request, res: Response) {
    try{
      await this.userUseCase.confirmEmail(req.params.token);
      return ServerHandler.sendResponse(res, 200, { message: 'Email confirmed successfully' });
    } catch (error) {
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    }
  }

  /**
   * Logs in a user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async login(req: Request, res: Response) {
    try{
      const token = await this.userUseCase.login(req.body.email, req.body.password);
      return ServerHandler.sendResponse(res, 201, {token: token});
    } catch (error){
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      await this.userUseCase.forgotPassword(req.body.email);
      return ServerHandler.sendResponse(res, 200, { message: 'Password reset email sent' });
    } catch (error) {
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    }
  }

  /**
   * Resets a user's password.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async resetPassword(req: Request, res: Response) {
    try{
      await this.userUseCase.resetPassword(req.body.token, req.body.newPassword);
      return ServerHandler.sendResponse(res, 200, { message: 'Password reset successfully' });
    } catch (error){
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    }
  }

  /**
   * Changes a user's password.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async changePassword(req: AuthenticatedRequest, res: Response) {
    try{
      const userId = await this.userUseCase.getUser(req.user.id);
      await this.userUseCase.changePassword(userId.id, req.body.oldPassword, req.body.newPassword);
      return ServerHandler.sendResponse(res, 200, { message: 'Password changed successfully' });
    } catch (error){
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    }
  }

  /**
   * Gets a user's profile.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async getProfile(req: any, res: Response) {
    try{
      // The user object is attached to the request in the authMiddleware
      const user = req.user;
      if (!user) {
        return ServerHandler.sendResponse(res, 401, { message: 'Not authenticated' });
      }
      const userInfo = await this.userUseCase.getUser(user.id);
      if (!userInfo) {
        return ServerHandler.sendResponse(res, 404, { message: 'User not found' });
      }

      // Remove sensitive data
      // @ts-ignore
      delete userInfo.password;
      return ServerHandler.sendResponse(res, 200, userInfo);
    } catch (error){
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    }
  }

  /**
   * Gets a user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async getUser(req: Request, res: Response) {
    try{
      const user = await this.userUseCase.getUser(req.params.id);
      return ServerHandler.sendResponse(res, 200, user);
    } catch (error){
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    }
  }

  /**
   * Updates a user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async updateUser(req: Request, res: Response) {
    try{
      const user = await this.userUseCase.updateUser(req.params.id, req.body);
      return ServerHandler.sendResponse(res, 200, user);
    } catch (error){
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    }
  }

  /**
   * Deletes a user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async deleteUser(req: Request, res: Response) {
    try{
      await this.userUseCase.deleteUser(req.params.id);
      return ServerHandler.sendResponse(res, 200, { message: 'User deleted successfully' });
    } catch (error){
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    }
  }

  /**
   * Updates a user's credit.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  async updateCredit(req: Request, res: Response) {
    try{
      const user = await this.userUseCase.updateCredit(req.params.id, req.body.credit);
      return ServerHandler.sendResponse(res, 200, user);
    } catch (error){
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    } 
  }

  /**
   * Gets all users.
   *
   * @param {Request} _req - The request object.
   * @param {Response} res - The response object.
   */
  async getUsers(_req: Request, res: Response) {
    try{
      const users = await this.userUseCase.getUsers();
      return ServerHandler.sendResponse(res, 200, users);
    } catch (error){
      if (error instanceof CustomError) {
        return ServerHandler.sendResponse(res, error.statusCode, { message: error.message });
      } else {
        return ServerHandler.handleError(res, error);
      }
    } 
  }

  async getMessages(req: AuthenticatedRequest, res: Response) {
    try {
      const page: number = Number(req.query.page) || 1;
      const pageSize: number = Number(req.query.pageSize) || 10;
      const messages = await this.userUseCase.getMessages(req.user.id, page, pageSize);
      return res.json(messages);
    } catch (error) {
      return ServerHandler.handleError(res, error);
    }
  }

  async dashboard(req: AuthenticatedRequest, res: Response) {
    try {
      const data = await this.userUseCase.dashboard(req.user.id);
      return ServerHandler.sendResponse(res, 200, data);
    } catch (error) {
      return ServerHandler.handleError(res, error);
    }
  }
}