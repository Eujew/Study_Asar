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

    async UserBalanceAfterPayment(id:string, balance:number,payment:number,TaskCondition:string):Promise<any>{
       balance-=payment;
       await this.CreateTransaction(payment,TaskCondition);
       return this.UserModel.updateOne({"_id":id},{$set:{"balance":balance}});
    }

    async UserBalanceAfterReward(id:string,balance:number, reward:number,TaskCondition:string):Promise<any>{
      balance+=reward;
      await this.CreateTransaction(reward,TaskCondition);
      return this.UserModel.updateOne({"_id":id},{$set:{"balance":balance}});
    }

    async CreateTransaction(money:number,TaskCondition:string){
      if (TaskCondition === "created") {
        const typeOfOpperation = "debit";
        const createdTransaction = new this.TransactionModel({"debit":money,"credit":0,"typeOfOpperation":typeOfOpperation});
        return await createdTransaction.save();
      }
      else if(TaskCondition === "completed"){
       const typeOfOpperation = "credit";
       const createdTransaction = new this.TransactionModel({"credit":money,"debit":0,"typeOfOpperation":typeOfOpperation});
       return await createdTransaction.save();
      }
    }
}