export interface IUser {
    name:string;
    email: string;
    password: string;
    clerkUserId:string;
    isApproved:boolean;
    isSuperAdmin:boolean;
    createdAt:string;
    updatedAt:string
}