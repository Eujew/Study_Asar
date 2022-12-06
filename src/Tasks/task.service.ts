import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tasks } from "./schema/task.schema";
import { Model } from "mongoose";
import { updateTaskDto } from "./dto/Update-Task.dto";
import { createTaskDto } from "./dto/createTasks.dto";
import { updateTaskConditionDto } from "./dto/complete_task_condition";
import { UserService } from "src/Users/user.service";
import { TransactionService } from "src/Payments/transaction.service";
import { TransactionDto } from "src/Payments/dto/transaction.dto";

@Injectable()
export class TaskService{
    constructor (
      private readonly ExecUser: UserService,
      @InjectModel('Task') private readonly TaskModel: Model<Tasks>,
      private readonly transaction:TransactionService

      ){}

    async create(CreateTaskDto:createTaskDto,TransactionDto:TransactionDto) {
        const createdTask = new this.TaskModel(CreateTaskDto);
        const task = await createdTask.save();
        const thisUser = await this.ExecUser.findOne(createdTask.performers);
        const UserBalance = thisUser.balance;
        this.transaction.UserBalanceAfterPayment(UserBalance,createdTask.payment);
        const TransactionInfo = await this.transaction.SaveTransactionInfo(TransactionDto);
        TransactionInfo.debit = createdTask.payment;
        TransactionInfo.typeOfOpperation = "debit";
        TransactionInfo.save();
        return task;
    }

    async findAll(){
        return await this.TaskModel.find().exec();
    }
    
    async findOne(id:string){
        return await this.TaskModel.findById(id).exec();
     }

     async update(id: string, UpdateTaskDto:updateTaskDto) {
        return this.TaskModel.findByIdAndUpdate(id, UpdateTaskDto);
     }

      async updateCondition(id:string, updateTaskConditionDto:updateTaskConditionDto,TransactionDto:TransactionDto){
         const thisTask = await this.TaskModel.findById(id);
         const thisUser = await this.ExecUser.findOne(thisTask.performers);
         const UserBalance = thisUser.balance;
         this.transaction.UserBalanceAfterReward(UserBalance,thisTask.reward);
         const TransactionInfo = await this.transaction.SaveTransactionInfo(TransactionDto);
         TransactionInfo.credit = thisTask.reward;
         TransactionInfo.typeOfOpperation = "credit";
         TransactionInfo.save();
         return this.TaskModel.findByIdAndUpdate(id, updateTaskConditionDto);
      }

     async deleteTask(id:string){
        return this.TaskModel.findByIdAndDelete(id);
     }

}
   





