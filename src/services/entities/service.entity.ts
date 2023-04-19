/* eslint-disable prettier/prettier */
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import { Document, SchemaType , SchemaTypes, Types } from "mongoose";
import { Module } from '@nestjs/common';


@Schema({timestamps:true})
export class ServicesEntity extends Document {

    @Prop()
    ServiceName: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    file: string

    /* @Prop({type:SchemaTypes.ObjectId,ref:"admin"})
    adminId:Types.ObjectId */
    @Prop([{type:SchemaTypes.ObjectId,ref:"Reservation"}])
    reservations:Types.ObjectId[]
    @Prop([{type:SchemaTypes.ObjectId,ref:"responsable"}])
    responsables:Types.ObjectId[]
}


export const ServicesSchema = SchemaFactory.createForClass(ServicesEntity);


