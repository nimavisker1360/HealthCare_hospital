"use server";

import userModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

export const createUser = async () => {
  try {
    const user = await currentUser();

    const mongoDBUserObj = {
      name: `${user?.firstName} ${user?.lastName}`,
      clerkUserId: user?.id,
      email: user?.emailAddresses[0].emailAddress,
      profilePic: user?.imageUrl,
      isApproved: false,
      isSupperAdmin: false,
    };

    const newUser = new userModel(mongoDBUserObj);
    await newUser.save();
    return {
      success: true,
      message: "User created successfully",
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getUserDataFromMongoDB = async () => {
  try {
    const user = await currentUser();

    const userFromMongoDB = await userModel.findOne({ clerkUserId: user?.id });
    if (userFromMongoDB) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(userFromMongoDB)),
      };
    }

    const newUser = await createUser();
    if (newUser.success) {
      return {
        success: true,
        data: newUser.data,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 })
    return {
      success: true,
      data: JSON.parse(JSON.stringify(users)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};