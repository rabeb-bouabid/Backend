import { Document } from "mongoose";
export interface Iprestataire extends Document {
    fullname: string;
    serviceId:string
    file:string
    detail:string
    adresse: string
    telephone: string
    experience: string
    certification: string
    servicename:string
    files: string
    
    
}