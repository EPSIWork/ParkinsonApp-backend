import { FamilyMemberEntity, FamilyMemberEntityEntityWithUser } from '../entities/FamilyMemberEntity';

export interface IFamilyMemberRepository {
  create(message: FamilyMemberEntity): Promise<FamilyMemberEntity>;
  findAll(): Promise<FamilyMemberEntityEntityWithUser[]>;
  findByUserId(userId: number): Promise< FamilyMemberEntityEntityWithUser[]| null>;
  findById(id: string): Promise<FamilyMemberEntity | null>;
  update(id: string, user: Partial<FamilyMemberEntity>): Promise<FamilyMemberEntity>;
  delete(id: string): Promise<void>;
}