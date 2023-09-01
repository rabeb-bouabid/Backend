import { Document } from "mongoose";
export interface Ifeedback extends Document {
    commentaire: string;
    userId:string
    prestataireId:string
}