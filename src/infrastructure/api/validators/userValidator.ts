import { body } from 'express-validator';
import User from '../../db/models/User';
import { CustomError } from '../utils/ServerHandler';


export const registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Email is required and must be a valid email address')
        .custom(async (email) => {
          const user = await User.findOne({ where: { email } });
          if (user) {
            throw new CustomError('Email already in use', 400);
          }
        }),
    body('firstName')
        .isString()
        .withMessage('firstName is required for registration'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password is required and must be at least 6 characters long'),
];