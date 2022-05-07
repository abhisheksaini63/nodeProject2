import { BaseModel } from "../basemodel";
import {Document, Schema , model, Types} from "mongoose"

export interface IUserLogin extends Document {
    _id:Types.ObjectId;
    Name: string;
    Phone: number;
    Email: string;
    Password: string;      
}

export class UserLogin extends BaseModel {
    _id?:Types.ObjectId;
    Name?: string ;
    Phone?: number;
    Email?: string;
    Password?: string;      
}

const UserLoginSchema: Schema =new Schema({
    Name: {
        type: String
    },
    Phone: {
        type: Number
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },    
}, {timestamps: true});

export const userLoginModel = model<UserLogin>('userlogins',UserLoginSchema)
