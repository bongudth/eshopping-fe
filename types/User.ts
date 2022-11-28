import { Role } from './Role';

export type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  fullName: string | null;
  email: string;
  isEmailConfirmed: boolean;
  password: string;
  avatarUrl: string | null;
  status: boolean;
  role: Role;
  phone: string | null;
  birthday: string | null;
  gender: string | null;
};
