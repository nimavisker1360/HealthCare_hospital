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
export interface IDoctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specializations: string[];
  startTime: string;
  endTime: string;
  workDays: string[];
  fee: number;
  bio: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
}
