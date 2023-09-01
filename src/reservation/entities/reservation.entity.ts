
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import { Document, SchemaType , SchemaTypes, Types } from "mongoose";
import { Module } from '@nestjs/common';


@Schema({timestamps:true})
export class ReservationEntity extends Document {

    @Prop()
    datedebut: Date;
    @Prop()
    adresse: string;
    @Prop()
    heure: string;
    @Prop()
    serviceName: string;
    @Prop({type:SchemaTypes.ObjectId,ref:"Services"})
    serviceId:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,ref:"user"})
    userId:Types.ObjectId;
    @Prop({type:SchemaTypes.ObjectId,ref:"responsable"})
    PrestataireId:Types.ObjectId;
    @Prop([{type:SchemaTypes.ObjectId,ref:"notification"}])
    notifications:Types.ObjectId[];
}

export const  ReservationSchema = SchemaFactory.createForClass( ReservationEntity);