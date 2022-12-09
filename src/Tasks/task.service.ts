import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tasks } from "./schema/task.schema";
import { Model } from "mongoose";
import { updateTaskDto } from "./dto/Update-Task.dto";
import { createTaskDto } from "./dto/createTasks.dto";
import { updateTaskConditionDto } from "./dto/complete_task_condition";
import { UserService } from "src/Users/user.service";
import { TransactionService } from "src/Payments/transaction.service";


@Injectable()
export class TaskService{
    constructor (
      private readonly ExecUser: UserService,
      @InjectModel('Task') private readonly TaskModel: Model<Tasks>,
      private readonly transaction:TransactionService,
      ){}

    async create(CreateTaskDto:createTaskDto) {
        const createdTask = new this.TaskModel(CreateTaskDto);
        const task = await createdTask.save();
        const thisUser = await this.ExecUser.findOne(createdTask.performers);
        thisUser.roles.filter((role)=>{
            if ( role === "manager"||role === "admin") throw BadRequestException;
        });
        this.transaction.UserBalanceAfterPayment(createdTask.performers,thisUser.balance,createdTask.payment,createdTask.condition); 
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

      async updateCondition(id:string, updateTaskConditionDto:updateTaskConditionDto){
         const thisTask = await this.TaskModel.findById(id);
         const thisUser = await this.ExecUser.findOne(thisTask.performers);
         this.transaction.UserBalanceAfterReward(thisTask.performers,thisUser.balance,thisTask.reward, thisTask.condition);
         const updatedTask = this.TaskModel.findByIdAndUpdate(id, updateTaskConditionDto);
         return updatedTask;
      }

     async deleteTask(id:string){
        return this.TaskModel.findByIdAndDelete(id);
     }

}
   





