import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tasks } from "./schema/task.schema";
import { Model } from "mongoose";
import { updateTaskDto } from "./dto/Update-Task.dto";
import { createTaskDto } from "./dto/createTasks.dto";
import { updateTaskConditionDto } from "./dto/update_task_condition";

@Injectable()
export class TaskService{
    constructor (@InjectModel('Task') private readonly TaskModel: Model<Tasks>){}

    async create(CreateTaskDto:createTaskDto) {
        const createdTask = new this.TaskModel(CreateTaskDto);
        return await createdTask.save();
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

      async updateCondition(id:string,UpdateTaskConditionDto:updateTaskConditionDto){
         return this.TaskModel.findByIdAndUpdate(id,updateTaskConditionDto)
      }

     async deleteTask(id:string){
        return this.TaskModel.findByIdAndDelete(id);
     }
     

}





