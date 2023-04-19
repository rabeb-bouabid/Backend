import { Document } from "mongoose";
export interface Icontact extends Document {
    username: string
    phone:string
    email:string
    subject:string
    message:string
    
}