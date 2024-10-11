export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  password: string;
  email: string;
  role: string;
  status: string;
  confirmed: boolean;
  credit: number;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}