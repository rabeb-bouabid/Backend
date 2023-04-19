
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import { Document, SchemaType , SchemaTypes, Types } from "mongoose";
import { Module } from '@nestjs/common';


@Schema({timestamps:true})
export class ReservationEntity extends Document {

    @Prop()
    Datedébut: Date;

    @Prop()
    Datefin: Date;

    @Prop()
    TypeEtablissement: string;
    @Prop()
    TypeService: string;

    @Prop()
    MontantTotal: number;

    @Prop({type:SchemaTypes.ObjectId,ref:"Services"})
    serviceId:Types.ObjectId
    @Prop({type:SchemaTypes.ObjectId,ref:"user"})
    userId:Types.ObjectId
    
}

export const  ReservationSchema = SchemaFactory.createForClass( ReservationEntity);