export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  clerkUserId: string;
  isApproved: boolean;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
