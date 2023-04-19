import { Document } from "mongoose";
export interface Iprestataire extends Document {
    Fullname: string;
    password:string
    file:string
    email:string
    serviceId:string;
    
}