import * as argon2 from "argon2"
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";


@Schema({ timestamps: true })
export class prestataireentity {
    @Prop()
    Fullname: string;
    @Prop()
    password:string
    @Prop()
    email: string;
    @Prop()
    file: string
   
    @Prop({type:SchemaTypes.ObjectId,ref:"Services"})
    serviceId:Types.ObjectId
}

export const prestataireSchema = SchemaFactory.createForClass(prestataireentity).pre("save", async function (){

    this.password = await argon2.hash(this.password)
});

