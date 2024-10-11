import { IUserRepository } from '../repositories/IUserRepository';
import { UserEntity } from '../entities/UserEntity';
import { sendEmail } from '../../infrastructure/utils/emailUtil';
import { config } from '../../config/config';
import { CustomError } from '../../infrastructure/api/utils/ServerHandler';
import { hashPassword, verifyPassword } from '../../infrastructure/api/helpers/crypto/bcrypt';
import { generateToken, verifyToken } from '../../infrastructure/api/helpers/crypto/jwt';
import {FamilyMemberRepository} from "../../infrastructure/db/repositories/FamilyMemberRepository";
import {Paginator} from "../../infrastructure/api/utils/paginator";

/**
 * UserUseCase class.
 * This class implements the use cases for the User entity.
 */
export class UserUseCase {

  /**
   * UserUseCase constructor.
   * @param {IUserRepository} userRepository - The user repository.
   */
  private familyMemberRepository: FamilyMemberRepository;

  constructor(private userRepository: IUserRepository) {
      this.familyMemberRepository = new FamilyMemberRepository();
  }

  /**
   * Registers a new user.
   *
   * @param {UserEntity} user - The user entity to register.
   * @returns {Promise<UserEntity>} - A promise that resolves to the registered user entity.
   */
  async register(user: UserEntity): Promise<UserEntity> {
    const hashedPassword = await hashPassword(user.password);
    const newUser = await this.userRepository.create({ ...user, password: hashedPassword, role: "user", status:"uncompleted"});
    const emailToken = generateToken({ id: newUser.id });
    const url = `${config.CONFIRM_EMAIL_URL}${emailToken}`;
    await sendEmail(newUser.email, 'Email confirmation', `Please confirm your email by clicking on the following link: ${url}`)
    return newUser;
  }

  /**
   * Logs in a user.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<string>} - A promise that resolves to the token of the logged-in user.
   */
  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (user && await verifyPassword(password, user.password)) {
      // Remove password from a user object
      const { password, ...userWithoutPassword } = user;
      return generateToken({ id: user.id, user:userWithoutPassword });
    }
    throw new CustomError('Invalid login credentials', 401);
  }

  /**
   * Confirms a user's email.
   *
   * @param {string} token - The token to verify.
   * @returns {Promise<void>} - A promise that resolves when the email is confirmed.
   */
  async confirmEmail(token: string): Promise<void> {
    const payload: any = verifyToken(token);
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    user.confirmed = true;
    user.emailVerifiedAt = new Date();
    await this.userRepository.update(user.id, user);
  }

  /**
   * Sends a password reset email to a user.
   *
   * This method is used when a user has forgotten their password and needs to reset it.
   * It generates a token used to verify the user's identity when resetting the password.
   * The token is sent to the user's email address in a password reset link.
   *
   * @param {string} email - The email address of the user who has forgotten their password.
   * @returns {Promise<void>} - A promise that resolves when the email has been sent.
   * @throws {CustomError} - If the user is not found, a custom error is thrown with a 404 status code.
   */
  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    const resetToken = generateToken({ id: user.id });
    const url = `${config.RESET_PASSWORD_URL}${resetToken}`;
    await sendEmail(user.email, 'Password reset', `Please reset your password by clicking on the following link: ${url}`);
  }

  /**
   * Resets a user's password.
   *
   * @param token
   * @param {string} newPassword - The new password of the user.
   * @returns {Promise<void>} - A promise that resolves when the password is reset.
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const payload: any = verifyToken(token);
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    user.password = await hashPassword(newPassword);
    await this.userRepository.update(user.id, user);
    await sendEmail(user.email, 'Password reset', 'Your password has been reset.');
  }

  /**
   * Changes a user's password.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} oldPassword - The old password of the user.
   * @param {string} newPassword - The new password of the user.
   * @returns {Promise<void>} - A promise that resolves when the password is changed.
   */
  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    if (!await verifyPassword(oldPassword, user.password)) {
      throw new CustomError('Invalid old password', 400);
    }
    user.password = await hashPassword(newPassword);
    await this.userRepository.update(user.id, user);
    await sendEmail(user.email, 'Password changed', 'Your password has been changed.');
  }

  /**
   * Gets a user.
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise<UserEntity>} - A promise that resolves to the user entity.
   */
  async getUser(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return user;
  }

  /**
   * Updates a user.
   *
   * @param {string} userId - The ID of the user.
   * @param {Partial<UserEntity>} user - The new details for the user.
   * @returns {Promise<UserEntity>} - A promise that resolves to the updated user entity.
   */
  async updateUser(userId: string, user: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.update(userId, user);
  }

  /**
   * Deletes a user.
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise<void>} - A promise that resolves when the user is deleted.
   */
  async deleteUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    if (user.role === 'admin') {
      throw new CustomError('Admins cannot be deleted', 400);
    }
    await this.userRepository.delete(userId);
    await sendEmail(user.email, 'Account deleted', 'Your account has been deleted.');
    return;
  }

  /**
   * Updates a user's credit.
   *
   * @param {string} userId - The ID of the user.
   * @param {number} amount - The amount to add to the user's credit.
   * @returns {Promise<void>} - A promise that resolves when the credit is updated.
   */
  async updateCredit(userId: string, amount: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    user.credit += amount;
    await this.userRepository.update(userId, user);
    await sendEmail(user.email, 'Credit recharge', `Your credit has been recharged by ${amount}.`);
    return;
  }

  /**
   * Gets all users.
   *
   * @returns {Promise<UserEntity[]>} - A promise that resolves to an array of all user entities.
   */
  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  /**
     * Gets all messages for a user.
     *
     * @param {string} userId - The ID of the user.
     * @param {number} page - The current page number.
     * @param {number} pageSize - The number of items per page.
     * @returns {Promise<any>} - A promise that resolves to an array of message entities.
   */
  async getMessages(userId: string, page: number = 1, pageSize: number = 10): Promise<any> {
    const allMessages =  await this.familyMemberRepository.findByUserId(parseInt(userId));
    const paginator = new Paginator(allMessages, pageSize);
    return paginator.getPage(page);
  }

  /**
   * Retrieves the dashboard data for a specific user.
   *
   * This method is used to get the dashboard data for a user.
   * It first retrieves the user details using the user ID.
   * If the user is not found, a custom error is thrown with a 404 status code.
   * If the user is found, it calls the `dashboard` method of the user repository with the user's ID.
   *
   * @param {string} userId - The ID of the user for whom to retrieve the dashboard data.
   * @returns {Promise<any>} - A promise that resolves to the dashboard data for the user.
   * @throws {CustomError} - If the user is not found, a custom error is thrown with a 404 status code.
   */
  async dashboard(userId: string): Promise<any> {
    const user = await this.userRepository.findById(userId);
    console.log(user)
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return await this.userRepository.dashboard(user.id);
  }
}