import { connect, Model, Document} from 'mongoose';
import * as dotenv from 'dotenv';
import { UserModel } from '../models/users/userModel';
import { IUserDocument } from '../models/users/userType'

dotenv.config();

export const models: {users?: Model<IUserDocument>
                     teams?: Model<Document> 
                    resources?: Model<Document> } =
                     {  users: UserModel

                    };

                        

export async function connectToDB(){
    try{
        let database = await connect(process.env.DB_CONN_STRING as string);
        console.log("Succesfully connect to DB")

    }catch(error){
        console.error(error);
    }
}

