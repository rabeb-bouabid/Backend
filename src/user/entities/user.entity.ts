import * as argon2 from "argon2"
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Document, Types } from "mongoose"


@Schema({ timestamps: true })
export class userentity {
    @Prop()
    username: string

    @Prop()
    nom: string

    @Prop()
    prenom: string

    @Prop()
    adresse: string
    
    @Prop()
    email: string

    @Prop()
    password:string

    @Prop()
    refreshtoken:string
 
    @Prop()
    file: string

    @Prop({type:SchemaTypes.ObjectId,ref:"Reservation"})
    reservationId:Types.ObjectId[]
   
    
}

export const userSchema = SchemaFactory.createForClass(userentity).pre("save", async function (){

    this.password = await argon2.hash(this.password)
});

