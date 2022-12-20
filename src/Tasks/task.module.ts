import { MongooseModule } from "@nestjs/mongoose";
import { Module } from '@nestjs/common';
import { TaskSchema} from "./schema/task.schema";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { TransactionModule } from "src/Payments/transaction.module";
import { UserModule } from "src/Users/user.module";
import { TransactionSchema } from "src/Payments/schema/transaction.schema";
import { UserSchema } from "src/Users/schema/user.schema";
import { ScheduleModule } from "@nestjs/schedule";


@Module({
    imports: [
    TransactionModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema, collection:'tasks'}]), 
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema, collection:'transaction'}]),
    MongooseModule.forFeature([{name:'User', schema:UserSchema, collection:'Users'}]),
],

    providers: [TaskService],
    controllers: [TaskController],
    exports: [TaskService]
})
export class TaskModule {}