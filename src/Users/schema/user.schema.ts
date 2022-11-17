import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserStatus } from 'src/constants.enum';
export type UserRoles = Users & Document;

@Schema()
export class Users {

  @Prop({type:String, required:true})
  username: string;

  @Prop([{required:true,type:String, enum:Object.values(UserStatus)}])
  roles: [string];

  @Prop({type:String, required:true})
  password: string;

  @Prop({type:String,required:true})
  email: string;  
}

export const UserSchema = SchemaFactory.createForClass(Users);
UserSchema.index({email: 1 }, {unique: true });
