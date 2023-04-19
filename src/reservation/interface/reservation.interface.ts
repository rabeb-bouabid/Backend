import { Document } from "mongoose";

export interface IReservation extends Document {
    readonly Datedébut: string;
    readonly Datefin: string;
    readonly TypeEtablissement: string;
    readonly TypeService: string;
     readonly MontantTotal: number;
     serviceId:string;
     userId:string;
    
}