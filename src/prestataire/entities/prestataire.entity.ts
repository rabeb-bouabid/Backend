import * as argon2 from "argon2"
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";


@Schema({ timestamps: true })
export class prestataireentity {
    @Prop()
    fullname: string;
    @Prop()
    file: string
    @Prop()
    adresse: string
    @Prop()
    telephone: string
    @Prop()
    detail: string
    @Prop()
    experience: string
    @Prop()
    servicename: string
    @Prop()
    certification: string
    @Prop()
    files: string[]
    @Prop({type:SchemaTypes.ObjectId,ref:"Services"})
    serviceId:Types.ObjectId
    @Prop([{type:SchemaTypes.ObjectId,ref:"Reservation"}])
    reservationId:Types.ObjectId[]
   
    
}

export const prestataireSchema = SchemaFactory.createForClass(prestataireentity).pre("save", async function (){

});

