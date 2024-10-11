import { IFamilyMemberRepository } from '../../../application/repositories/IFamilyMemberRepository';
import FamilyMember from '../models/FamilyMember';
import User from '../models/User';
import {FamilyMemberEntity} from "../../../application/entities/FamilyMemberEntity";

export class FamilyMemberRepository implements IFamilyMemberRepository {
  async create(familyMember: any): Promise<FamilyMemberEntity> {
    const newFamilyMember= await FamilyMember.create(familyMember);
    return newFamilyMember.toJSON() as FamilyMemberEntity;
  }

  async findAll(): Promise<any[]> {
    const familyMembers = await FamilyMember.findAll();
    return familyMembers.map(familyMember => familyMember.toJSON() as FamilyMemberEntity);
  }

  async findById(id: string): Promise<FamilyMemberEntity | null> {
    const familyMember = await FamilyMember.findByPk(id);
    return familyMember ? familyMember.toJSON() as FamilyMemberEntity : null;
  }

  async update(id: string, familyMember: Partial<FamilyMemberEntity>): Promise<FamilyMemberEntity> {
    await FamilyMember.update(familyMember, { where: { id } });
    const updatedFamilyMember = await FamilyMember.findByPk(id);
    return updatedFamilyMember!.toJSON() as FamilyMemberEntity;
  }

  async delete(id: string): Promise<void> {
    await FamilyMember.destroy({ where: { id } });
  }

  /**
   * This method is used to retrieve familyMembers by a specific user ID with pagination.
   *
   * @async
   * @param {number} userId - The ID of the user.
   * @returns {Promise<FamilyMemberEntity[]>} - Returns a promise that resolves to an array of FamilyMemberEntityEntityWithUser objects.
   */
  async findByUserId(userId: number): Promise<FamilyMemberEntity[]> {
    const familyMembers = await FamilyMember.findAll(
      {
        where: { user: userId },
        order: [['createdAt', 'DESC']]
      }
    );
    return familyMembers.map(familyMember => familyMember.toJSON() as FamilyMemberEntity);
  }
}
