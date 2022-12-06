import {  Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Users } from "src/Users/schema/user.schema";
import { TransactionDto} from "./dto/transaction.dto";
import { Transactions } from "./schema/transaction.schema";




@Injectable()
export class TransactionService{
    constructor (
      @InjectModel('User') private readonly UserModel: Model<Users>,
      @InjectModel('Transaction') private readonly TransactionModel: Model<Transactions>){}

    async UserBalanceAfterPayment(balance:number,payment:number):Promise<any>{
       balance-=payment;
       return this.UserModel.updateOne({ },{$set:{"balance":balance}});
    }

    async UserBalanceAfterReward(balance:number, reward:number):Promise<any>{
      balance+=reward;
      return this.UserModel.updateOne({ },{$set:{"balance":balance}});
    }

    async SaveTransactionInfo(TransactionDto:TransactionDto){
      const createdTransaction = new this.TransactionModel(TransactionDto);
      return await createdTransaction.save();
    }
}