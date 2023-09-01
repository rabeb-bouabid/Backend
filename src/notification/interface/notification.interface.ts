import { Document } from "mongoose";
export interface Inot extends Document {
    message: string;
    userId:string
    serviceId:string
    readonly Datedébut: string;
    readonly Datefin: string;
    
}