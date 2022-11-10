import { Controller, Post,Body,Get,Param } from "@nestjs/common";
import { createTaskDto } from "./dto/createTasks.dto";
import { TaskService } from "./task.service";

@Controller('task')
export class TaskController{
    constructor (private readonly TaskService:TaskService){}

    @Post()
    async create(@Body() createTaskDto: createTaskDto){
        await this.TaskService.create(createTaskDto);
    }

     @Get(':id')
     async find(@Param('id') id:string) {
         return this.TaskService.find(id)
     }
}