import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument} from 'mongoose';
import {TaskStatus} from '../../constants.enum';


export type ExecuteTask = HydratedDocument<Tasks>;

@Schema()
export class Tasks {

  @Prop({required:true})
  title: string;  

  @Prop({required:true})
  description:string; 

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  performers:string;
  
  @Prop({required:true,type:String, enum: Object.values(TaskStatus),default:'created'})
  condition:string; 

  @Prop({required:true})
  deadline:Date; 

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
  taskLord: string;

  @Prop({default:Math.floor(Math.random()*20)+10})
  payment:number;

  @Prop({default:Math.floor(Math.random()*20)+30})
  reward:number;

  @Prop({type:Boolean,required:true,default:false})
  Done:boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Tasks);