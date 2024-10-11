import {IFamilyMemberRepository} from '../repositories/IFamilyMemberRepository';
import {FamilyMemberEntity} from '../entities/FamilyMemberEntity';
import {UserEntity} from '../entities/UserEntity';
import {IUserRepository} from "../repositories/IUserRepository";
import {config} from "../../config/config";
import {Paginator} from "../../infrastructure/api/utils/paginator";

export class FamilyMemberUseCase {
  constructor(private messageRepository: IFamilyMemberRepository, private userRepository: IUserRepository) {}

  /**
   * This method is used to retrieve all messages.
   *
   * @async
   * @returns {Promise<MessageEntityWithUser[]>} - Returns a promise that resolves to an array of MessageEntityWithUser objects.
   */
  async getAll(page: number, pageSize: number): Promise<any> {
    const allMessages = await this.messageRepository.findAll();
    const paginator = new Paginator(allMessages, pageSize);
    return paginator.getPage(page);
  }

  /**
   * This method is used to create a new message.
   *
   * @async
   * @param familyMember
   * @param {UserEntity} userData - The user entity object containing the user details.
   * @returns {Promise<MessageEntity>} - Returns a promise that resolves to a MessageEntity object.
   *
   * @throws Will throw an error if the SMS sending fails.
   */
  async create(familyMember: FamilyMemberEntity, userData: UserEntity): Promise<any> {
    // Create the message in the repository and return the result
    return await this.messageRepository.create({...familyMember});
  }

  /**
   * This method is used to find a message by its user ID.
   *
   * @async
   * @param {number} id - The ID of the user.
   * @param page
   * @param pageSize
   * @returns {Promise<MessageEntityWithUser[] | null>} - Returns a promise that resolves to an array of MessageEntityWithUser objects or null if no messages are found.
   */
  async findById(id: number, page: number, pageSize: number): Promise<object | null> {
    const allMessages = await this.messageRepository.findByUserId(id);
    console.log(allMessages);
    const paginator = new Paginator(allMessages, pageSize);
    console.log(JSON.stringify(paginator.getPage(page)));
    return paginator.getPage(page);
  }
}