import { Controller, Post,Body,Get,Param,Put,Delete, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decoratores/roles.decorator";
import { UserStatus } from "src/constants.enum";
import { createTaskDto } from "./dto/createTasks.dto";
import { updateTaskDto } from "./dto/Update-Task.dto";
import { updateTaskConditionDto } from "./dto/update_task_condition";
import { TaskService } from "./task.service";

@Controller('task')

export class TaskController{
    constructor (private readonly TaskService:TaskService){}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @Roles(UserStatus.ADMIN,UserStatus.MANAGER)
    async create(@Body() createTaskDto: createTaskDto){
        await this.TaskService.create(createTaskDto);
    }

     @Get()
     async findAll() {
         return this.TaskService.findAll();
     }

     @Get(':id')
     async findOne(@Param('id') id: string){
        return this.TaskService.findOne(id)
     }

     @Put(':id')
      @UseGuards(AuthGuard('jwt'))
      @Roles(UserStatus.ADMIN,UserStatus.MANAGER)
      update(@Param('id') id:string, @Body() UpdateTaskDto:updateTaskDto){
        return this.TaskService.update(id, UpdateTaskDto);
     }

     @Put('condition')
     updateCondition(@Param('id') id:string, @Body() UpdateTaskConditionDto:updateTaskConditionDto){
        return this.TaskService.updateCondition(id, UpdateTaskConditionDto);
     }

     @Delete(':id')
     remove(@Param('id') id:string){
        return this.TaskService.deleteTask(id);
     }

}