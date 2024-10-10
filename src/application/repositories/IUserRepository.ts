import { UserEntity } from '../entities/UserEntity';

/**
 * IUserRepository interface.
 * This interface defines the methods that a User Repository should implement.
 */
export interface IUserRepository {

  /**
   * Creates a new user.
   *
   * @param {UserEntity} user - The user entity to create.
   * @returns {Promise<UserEntity>} - A promise that resolves to the created user entity.
   */
  create(user: UserEntity): Promise<UserEntity>;

  /**
   * Finds a user by their username.
   *
   * @param {string} username - The username to search for.
   * @returns {Promise<UserEntity | null>} - A promise that resolves to the user entity if found, null otherwise.
   */
  findByUsername(username: string): Promise<UserEntity | null>;

  /**
   * Finds a user by their email.
   *
   * @param {string} email - The email to search for.
   * @returns {Promise<UserEntity | null>} - A promise that resolves to the user entity if found, null otherwise.
   */
  findByEmail(email: string): Promise<UserEntity | null>;

  /**
   * Finds a user by their ID.
   *
   * @param {string} id - The ID to search for.
   * @returns {Promise<UserEntity | null>} - A promise that resolves to the user entity if found, null otherwise.
   */
  findById(id: string): Promise<UserEntity | null>;

  /**
   * Updates a user's details.
   *
   * @param {string} id - The ID of the user to update.
   * @param {Partial<UserEntity>} user - The new details for the user.
   * @returns {Promise<UserEntity>} - A promise that resolves to the updated user entity.
   */
  update(id: string, user: Partial<UserEntity>): Promise<UserEntity>;

  /**
   * Deletes a user.
   *
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} - A promise that resolves when the user is deleted.
   */
  delete(id: string): Promise<void>;

  /**
   * Recharges a user's credit.
   *
   * @param {string} id - The ID of the user to recharge credit for.
   * @param {number} credit - The amount of credit to add.
   * @returns {Promise<UserEntity>} - A promise that resolves to the updated user entity.
   */
  rechargeCredit(id: string, credit: number): Promise<UserEntity>;

  /**
   * Finds all users.
   *
   * @returns {Promise<UserEntity[]>} - A promise that resolves to an array of all user entities.
   */
  findAll(): Promise<UserEntity[]>;

  /**
   * Finds all users with a specific role.
   *
   * @returns {Promise<UserEntity[]>} - A promise that resolves to an array of user entities with the specified role.
   * @param id
   */
  dashboard(id:string): Promise<any>;
}