import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: any; // Define the type of 'user' as per your requirements
}