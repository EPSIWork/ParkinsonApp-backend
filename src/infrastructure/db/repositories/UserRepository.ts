import { IUserRepository } from '../../../application/repositories/IUserRepository';
import { UserEntity } from '../../../application/entities/UserEntity';
import User from '../models/User';
import Message from "../models/FamilyMember";

export class UserRepository implements IUserRepository {
  /**
   * Creates a new user in the database.
   *
   * @param {any} user - The user object containing the details of the user to be created.
   * @returns {Promise<UserEntity>} - Returns a promise that resolves to the created user entity.
   */
  async create(user: any): Promise<UserEntity> {
    const newUser = await User.create(user);
    return newUser.toJSON() as UserEntity;
  }

  /**
   * Finds a user by their username.
   *
   * @param {string} username - The username of the user to find.
   * @returns {Promise<UserEntity | null>} - Returns a promise that resolves to the user entity if found, null otherwise.
   */
  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await User.findOne({ where: { username } });
    return user ? user.toJSON() as UserEntity : null;
  }

  /**
   * Finds a user by their ID.
   *
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<UserEntity | null>} - Returns a promise that resolves to the user entity if found, null otherwise.
   */
  async findById(id: string): Promise<UserEntity | null> {
    const user = await User.findByPk(id);
    return user ? user.toJSON() as UserEntity : null;
  }

  /**
   * Updates a user's details.
   *
   * @param {string} id - The ID of the user to update.
   * @param {Partial<UserEntity>} user - An object containing the details to update.
   * @returns {Promise<UserEntity>} - Returns a promise that resolves to the updated user entity.
   */
  async update(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
    await User.update(user, { where: { id } });
    const updatedUser = await User.findByPk(id);
    return updatedUser!.toJSON() as UserEntity;
  }

  /**
   * Deletes a user.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} - Returns a promise that resolves when the user is deleted.
   */
  async delete(id: string): Promise<void> {
    await User.destroy({ where: { id } });
  }

  /**
   * Finds a user by their email.
   *
   * @param {string} email - The email of the user to find.
   * @returns {Promise<UserEntity | null>} - Returns a promise that resolves to the user entity if found, null otherwise.
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({ where: { email } });
    return user ? user.toJSON() as UserEntity : null;
  }

  /**
   * Recharges a user's credit.
   *
   * @param {string} id - The ID of the user to recharge credit for.
   * @param {number} credit - The amount of credit to add.
   * @returns {Promise<UserEntity>} - Returns a promise that resolves to the updated user entity.
   */
  async rechargeCredit(id: string, credit: number): Promise<UserEntity> {
    await User.update({ credit }, { where: { id } });
    const updatedUser = await User.findByPk(id);
    return updatedUser!.toJSON() as UserEntity;
  }

  /**
   * Finds all users.
   *
   * @returns {Promise<UserEntity[]>} - Returns a promise that resolves to an array of all user entities.
   */
  async findAll(): Promise<UserEntity[]> {
    const users = await User.findAll();
    return users.map(user => user.toJSON() as UserEntity);
  }

  /**
   * Retrieves the dashboard data for a specific user.
   *
   * This method is used to get the count of messages and the credit of a user for the dashboard.
   * It first counts the number of messages associated with the user.
   * Then it retrieves the user's details to get the credit.
   * If the user is not found, the credit is set to 0.
   *
   * @param {string} id - The ID of the user for whom to retrieve the dashboard data.
   * @returns {Promise<any>} - A promise that resolves to an object containing the count of messages and the user's credit.
   */
  async dashboard(id: string): Promise<any> {
    const messageCount = await Message.count({ where : { user:id }});
    const user = await User.findByPk(id);
    let userCredit = 0;
    if(user){
      userCredit = user.toJSON().credit;
    }
    return { messageCount, userCredit };
  }
}