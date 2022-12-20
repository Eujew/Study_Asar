import { Controller, Post,Body,Get,Param,Put,Delete, UseGuards, Query } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/decoratores/roles.decorator";
import { UserStatus } from "src/constants.enum";
import { createTaskDto } from "./dto/createTasks.dto";
import { updateTaskDto } from "./dto/Update-Task.dto";
import { TaskService } from "./task.service";
import { updateTaskConditionDto } from "./dto/complete_task_condition";
import { TransactionDto } from "src/Payments/dto/transaction.dto";
import { TransactionService } from "src/Payments/transaction.service";

@Controller('task')
export class TaskController{
    constructor (private readonly TaskService:TaskService){}

    @Post()
    //@UseGuards(AuthGuard('jwt'))
    //@Roles(UserStatus.ADMIN,UserStatus.MANAGER)
    async create(@Body() createTaskDto: createTaskDto) {
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
      //@UseGuards(AuthGuard('jwt'))
      //@Roles(UserStatus.ADMIN,UserStatus.MANAGER)
      update(@Param('id') id:string, @Body() UpdateTaskDto:updateTaskDto){
        return this.TaskService.update(id, UpdateTaskDto);
     }

     @Put(':id/condition')
     updateCondition(@Param('id') id:string,
                     @Query() updateTaskConditionDto:updateTaskConditionDto){
        return this.TaskService.updateCondition(id, updateTaskConditionDto);
     }

     @Delete(':id')
     remove(@Param('id') id:string){
        return this.TaskService.deleteTask(id);
     }
   
}