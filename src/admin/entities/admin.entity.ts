















import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { userentity } from 'src/user/entities/user.entity';
import { Document , SchemaTypes,Types} from 'mongoose';
import * as argon2 from "argon2"
@Schema()
export class AdminEntity extends userentity {
   /*  @Prop([{type:SchemaTypes.ObjectId,ref:"Services"}])
     services:Types.ObjectId[]  */
   
}
export type AdminDocument = AdminEntity & Document;
export const AdminSchema = SchemaFactory.createForClass(AdminEntity)
.pre("save", async function (){

    this.password = await argon2.hash(this.password)
})
