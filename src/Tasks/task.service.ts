import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tasks } from "./schema/task.schema";
import { Model } from "mongoose";
import { updateTaskDto } from "./dto/Update-Task.dto";
import { createTaskDto } from "./dto/createTasks.dto";
import { updateTaskConditionDto } from "./dto/complete_task_condition";
import { UserService } from "src/Users/user.service";
import { TransactionService } from "src/Payments/transaction.service";
import { Interval } from "@nestjs/schedule";
import { Users } from "src/Users/schema/user.schema";
import { randomInt } from "crypto";
import { of } from "rxjs";
//import { TaskModule } from "./task.module";


@Injectable()
export class TaskService{
    constructor (
      private readonly ExecUser: UserService,
      private readonly transaction : TransactionService,
      @InjectModel( 'Task' ) 
      private readonly TaskModel : Model<Tasks>,
      @InjectModel( 'User' ) 
      private readonly UserModel : Model<Users>,
      ){}

    async create( CreateTaskDto : createTaskDto ) {
        const createdTask = new this.TaskModel( CreateTaskDto );
        const task = await createdTask.save();
        const thisUser = await this.ExecUser.findOne( createdTask.performers );
        thisUser.roles.filter(( role )=>{
            if ( role === "manager" ||role === "admin" ) throw BadRequestException;
        });
        this.transaction.UserBalanceAfterPayment( createdTask.performers , thisUser.balance , createdTask.payment ); 
        return task;
    }

    async findAll(){
            return await this.TaskModel.find().exec();
    }
    
    async findOne( id:string ){
            return await this.TaskModel.findById( id ).exec();
     }

     async update( id : string,
        UpdateTaskDto : updateTaskDto ) {
            return this.TaskModel.findByIdAndUpdate( id , UpdateTaskDto );
     }

      async updateCondition( id : string, 
        updateTaskConditionDto : updateTaskConditionDto ){
            const thisTask = await this.TaskModel.findById( id );
            const thisUser = await this.ExecUser.findOne( thisTask.performers );
            this.transaction.UserBalanceAfterReward( thisTask.performers , thisUser.balance , thisTask.reward );
            const updatedTask = this.TaskModel.findByIdAndUpdate( id , updateTaskConditionDto );
                return updatedTask;
      }

     async deleteTask( id : string ){
            return this.TaskModel.findByIdAndDelete( id );
     }

    @Interval(5000)
    public async ChangeUserForExpiredTask(){
        
        const Workers = await this.UserModel.find( { roles : "worker" } , { id : 1 } );
        const rndWorker = await Workers[ Math.floor( Math.random() * ( Workers.length-1 ))];

        await this.TaskModel.findOneAndUpdate(
            { deadline : { $lt : new Date( Date.now() )}},
            { $set : {performers :  rndWorker, deadline : new Date('2023-12-20T10:57:47.847Z')}});
        return;
   }

}




