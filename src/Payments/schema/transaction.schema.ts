import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
//import { HydratedDocument } from "mongoose";


export type ExecuteTransaction = Transactions & Document;

@Schema({
    timestamps:true
})
export class Transactions{

    @Prop({type:String})
    typeOfOpperation:string;

    @Prop({type:Number,required:true,default:0})
    debit:number;

    @Prop({type:Number,required:true,default:0})
    credit:number;

}

export const TransactionSchema = SchemaFactory.createForClass(Transactions);