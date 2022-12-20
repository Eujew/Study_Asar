import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumberString } from "class-validator";



export type ExecuteTransaction = Transactions & Document;

@Schema({
    timestamps:true
})
export class Transactions{

    @Prop({type:IsNumberString})
    UserID:string;

    @Prop({type:String})
    typeOfOpperation:string;

    @Prop({type:Number,required:true,default:0})
    debit:number;

    @Prop({type:Number,required:true,default:0})
    credit:number;

}

export const TransactionSchema = SchemaFactory.createForClass(Transactions);