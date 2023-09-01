import { Document } from "mongoose";
export interface IService extends Document {
    readonly ServiceName:string;
    readonly description:string;
    readonly price:number;
   
    
}