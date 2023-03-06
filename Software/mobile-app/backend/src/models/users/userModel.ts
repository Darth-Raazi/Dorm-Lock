import { model } from 'mongoose';
import { IUserDocument } from './userType';
import userSchema from './userSchema';

export const UserModel = model<IUserDocument>("User", userSchema);