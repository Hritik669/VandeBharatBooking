//Mongoose model for a collection --> users

import { Schema, model } from 'mongoose';

enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

interface User {
    username: string;
    password:string;
    email: string;
    role: UserRole;
}

const userSchema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { 
        type: String, enum: [UserRole.ADMIN, UserRole.USER],
         required: true
         },
  });


export const UserModel = model<User>('users', userSchema);