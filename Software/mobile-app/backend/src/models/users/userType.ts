import { Document, Model } from 'mongoose';

export interface IUser{
    username:string,
    passwordHash:string,
}

export interface IUserDocument extends IUser, Document{};
export interface IUserModel extends Model<IUserDocument>{};