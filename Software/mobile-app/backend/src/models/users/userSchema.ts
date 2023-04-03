import { Schema } from 'mongoose';

const userSchema =  new Schema({
    username:String,
    passwordHash:String

}, {collection:'users'});

export default userSchema;