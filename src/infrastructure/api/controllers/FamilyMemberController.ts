import { Request, Response } from 'express';
import { FamilyMemberUseCase } from '../../../application/use_cases/FamilyMemberUseCase';
import { FamilyMemberRepository } from '../../db/repositories/FamilyMemberRepository';
import { ServerHandler } from '../utils/ServerHandler';
import { AuthenticatedRequest } from '../utils/requestWithUser';
import {UserRepository} from "../../db/repositories/UserRepository";
import {isSuspiciousContent} from "../../utils/suspicious";


export class FamilyMemberController {
  private familyMemberUseCase = new FamilyMemberUseCase(new FamilyMemberRepository(), new UserRepository());
  
  /**
   * Retrieves a list of all messages.
   *
   * This method is used to get a list of all messages in the system.
   * It first parses the page and pageSize from the request query parameters.
   * If these parameters are not provided, default values are used (page: 1, pageSize: 10).
   * It then calls the `getAll` method of the `familyMemberUseCase` with the page and pageSize.
   * The result is a list of messages.
   * If an error occurs during this process, it is caught and handled by the `handleError` method of the `ServerHandler`.
   *
   * @param {Request} req - The request object, which may include page and pageSize in `req.query`.
   * @param {Response} res - The response object, used to send the response back to the client.
   * @returns {Promise<Response>} - A promise that resolves to the response object.
   */
  async list(req: Request, res: Response): Promise<object | void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const messages = await this.familyMemberUseCase.getAll(page, pageSize);
      return ServerHandler.sendResponse(res, 200, messages);
    } catch (error) {
      return ServerHandler.handleError(res, error);
    }
  }

  /**
   * Creates a new message.
   *
   * This method is used to create a new message in the system.
   * It first checks if the content of the message is suspicious using the `isSuspiciousContent` method.
   * If the content is suspicious,
   * a response with a 400 status code and a message indicating the suspicious content is sent back to the client.
   * If the content is not suspicious, it calls the `create`
   * method of the `familyMemberUseCase` with the request body and the user.
   * The result is the newly created message.
   * If an error occurs during this process, it is caught and handled by the `handleError` method of the `ServerHandler`.
   *
   * @param {AuthenticatedRequest} req - The request object, which includes the message in `req.body.message` and the user in `req.user`.
   * @param {Response} res - The response object, used to send the response back to the client.
   * @returns {Promise<Response>} - A promise that resolves to the response object.
   */
  async create(req: AuthenticatedRequest, res: Response) : Promise<object | void> {
    try {
      const newFamilyMember = await this.familyMemberUseCase.create(req.body, req.user);
      return ServerHandler.sendResponse(res, 201, newFamilyMember);
    } catch (error) {
      return ServerHandler.handleError(res, error);
    }
  }

  /**
   * Retrieves messages for a specific user.
   *
   * This method is used to get the messages for a user based on their ID.
   * It first parses the page and pageSize from the request query parameters.
   * If these parameters are not provided, default values are used (page: 1, pageSize: 5).
   * It then calls the `findById` method of the `familyMemberUseCase` with the user's ID, page, and pageSize.
   * The result is a list of messages for the user.
   * If an error occurs during this process, it is caught and handled by the `handleError` method of the `ServerHandler`.
   *
   * @param {AuthenticatedRequest} req - The request object, which includes the user's ID in `req.user.id`.
   * @param {Response} res - The response object, used to send the response back to the client.
   * @returns {Promise<Response>} - A promise that resolves to the response object.
   */
  async findByUserId(req: AuthenticatedRequest, res: Response) : Promise<object | void>  {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 5;
      const messages = await this.familyMemberUseCase.findById(req.user.id, page, pageSize);
      return ServerHandler.sendResponse(res, 200, messages);
    } catch (error) {
      return ServerHandler.handleError(res, error);
    }
  }
}