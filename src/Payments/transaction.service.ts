import {  Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "src/Users/schema/user.schema";
import { Transactions } from "./schema/transaction.schema";

@Injectable()
export class TransactionService{
    constructor (
      @InjectModel('User') private readonly UserModel: Model<Users>,
      @InjectModel('Transaction') private readonly TransactionModel: Model<Transactions>){}

    async UserBalanceAfterPayment(id:string, balance:number,payment:number):Promise<any>{
       balance-=payment;
       await this.CreateTransaction(id,payment,"debit");
       return this.UserModel.updateOne(
          {"_id":id},
          {$set:{"balance":balance}});
    }

    async UserBalanceAfterReward(id:string,balance:number, reward:number):Promise<any>{
      balance+=reward;
      await this.CreateTransaction(id,reward,"credit");
      return this.UserModel.updateOne(
        {"_id":id},
        {$set:{"balance":balance}});
    }

    async CreateTransaction(id:string, money:number,typeOfOpperation:string){
        if (typeOfOpperation === "debit"){
        const createdTransaction = new this.TransactionModel({"UserID":id,"debit":money,"credit":0,"typeOfOpperation":typeOfOpperation});
        return await createdTransaction.save();
        }
        if (typeOfOpperation === "credit"){
        const createdTransaction = new this.TransactionModel({"UserID":id,"debit":0,"credit":money,"typeOfOpperation":typeOfOpperation});
        return await createdTransaction.save();
        }
    }
}