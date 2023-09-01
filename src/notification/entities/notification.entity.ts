import * as argon2 from "argon2"
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";


@Schema({ timestamps: true })
export class notificationentity {
    @Prop()
    message: string;
    @Prop()
    Datedébut: Date;
    @Prop()
    Datefin: Date;
    @Prop({type:SchemaTypes.ObjectId,ref:"Services"})
    serviceId:Types.ObjectId
    @Prop({type:SchemaTypes.ObjectId,ref:"user"})
    userId:Types.ObjectId
    @Prop([{type:SchemaTypes.ObjectId,ref:"Reservation"}])
    reservations:Types.ObjectId[]
}

export const notificationSchema = SchemaFactory.createForClass(notificationentity).pre("save", async function (){

});