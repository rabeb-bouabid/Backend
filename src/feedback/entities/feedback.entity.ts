import * as argon2 from "argon2"
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";


@Schema({ timestamps: true })
export class feedbackentity {
    @Prop()
    commentaire: string;
   
    @Prop({ type:SchemaTypes.ObjectId,ref:'user'})
    userId:Types.ObjectId;
    @Prop({ type:SchemaTypes.ObjectId,ref:'prestataire'})
    prestataireId:Types.ObjectId;
   
    
}

export const feedbackSchema = SchemaFactory.createForClass(feedbackentity).pre("save", async function (){

});

