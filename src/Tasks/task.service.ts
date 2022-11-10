import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Tasks } from "./schema/task.schema";
import { Model } from "mongoose";
import { createTaskDto } from "./dto/createTasks.dto";

@Injectable()
export class TaskService{
    constructor (@InjectModel('Task') private readonly TaskModel: Model<Tasks>){}

    async create(createTaskDto:createTaskDto) {
        const createdTask = new this.TaskModel(createTaskDto);
        return await createdTask.save();
    }

    async find(id: string){
        return await this.TaskModel.findById(id).exec();
    }
}





