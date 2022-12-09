import { MongooseModule } from "@nestjs/mongoose";
import { Module } from '@nestjs/common';
import { TaskSchema} from "./schema/task.schema";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { TransactionModule } from "src/Payments/transaction.module";
import { UserModule } from "src/Users/user.module";
import { TransactionSchema } from "src/Payments/schema/transaction.schema";


@Module({
    imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema, collection:'tasks'}]), 
    TransactionModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema, collection:'transaction'}])
],

    providers: [TaskService],
    controllers: [TaskController],
    exports: [TaskService]
})
export class TaskModule {}