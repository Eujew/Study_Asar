import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/Users/schema/user.schema";
import { UserModule } from "src/Users/user.module";
import { TransactionSchema } from "./schema/transaction.schema";
import { TransactionService } from "./transaction.service";

@Module({
    imports:[MongooseModule.forFeature([{ name: 'User', schema: UserSchema, collection:'users'}]),
    UserModule,
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema, collection:'transaction'}]),
],  
    providers:[TransactionService],
    exports: [TransactionService],
})

export class TransactionModule {}