import * as argon2 from "argon2"
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";


@Schema({ timestamps: true })
export class contactentity
{
    @Prop()
    username: string
    @Prop()
    phone: string
    @Prop()
    email: string
    @Prop()
    subject: string
    @Prop()
    message: string
}
export const contactSchema = SchemaFactory.createForClass(contactentity).pre("save", async function (){
    
})