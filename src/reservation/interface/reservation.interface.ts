import { Document } from "mongoose";

export interface IReservation extends Document {
     datedébut: string;
     heure: string;
     serviceName: string;
     adresse: string;
     serviceId:string;
     userId:string;
     PrestataireId:string;
}