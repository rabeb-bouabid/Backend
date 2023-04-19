import { Document } from "mongoose";
export interface IntUser extends Document {
    username:string
    nom:string
    prenom:string
    adresse:string
    email:string
    password:string
    file:string
    refreshtoken:string
    
}