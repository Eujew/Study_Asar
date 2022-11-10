import { MongooseModule } from "@nestjs/mongoose";
import { Module } from '@nestjs/common';
import { TaskCreater} from "./schema/task.schema";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskCreater }])],
    providers: [TaskService],
    controllers: [TaskController],
})
export class TaskModule {}