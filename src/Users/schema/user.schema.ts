import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from './user.roles.enum';
export type UserRoles = Users & Document;

@Schema()
export class Users {

  @Prop({type:String, required:true})
  username: string;

  @Prop({required:true, enum: Object.values(Roles) })
  role:string;

  @Prop({type:String, required:true})
  password: string;

  @Prop({type:String,required:true})
  email: string;   
}

export const User = SchemaFactory.createForClass(Users);
User.index({email: 1 }, {unique: true });
