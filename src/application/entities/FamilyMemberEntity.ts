export interface FamilyMemberEntity {
  id: string;
  helper: string;
  user: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
