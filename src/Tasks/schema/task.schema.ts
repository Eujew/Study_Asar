import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument} from 'mongoose';
import {TaskStatus} from '../../constants.enum';


export type ExecuteTask = HydratedDocument<Tasks>;

@Schema()
export class Tasks {

  @Prop({required:true})
  name: string;  

  @Prop({required:true})
  description:string; 

  @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}] })
  performers:[string];
  
  @Prop([{required:true,type:String, enum: Object.values(TaskStatus)}])
  condition:[string]; 

  @Prop({required:true})
  deadline:Date; 

  @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],required:true})
  taskLord: string;
}

export const TaskSchema = SchemaFactory.createForClass(Tasks);