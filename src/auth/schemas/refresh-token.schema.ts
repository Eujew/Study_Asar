import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose,{ HydratedDocument } from "mongoose";

export type ExecuteToken = HydratedDocument<refreshTokens>;

@Schema()
export class refreshTokens{

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Users',required:true})
    userId:string;

    @Prop({type:String, required:true})
    refreshToken:string;

    @Prop({type:String, required:true})
    ip:string;

    @Prop({type:String, required:true})
    browser:string;

    @Prop({type:String, required:true})
    country:string;
}

export const refreshTokenSchema = SchemaFactory.createForClass(refreshTokens);

