import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Users/user.module';
import { TaskModule } from './Tasks/task.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { TransactionModule } from './Payments/transaction.module';
import { ScheduleModule } from '@nestjs/schedule';


dotenv.config({path:"./config.env"});
const environment = process.env.MONGODB_WRITE_CONNECTION_STRING || 'development';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    TaskModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.MONGODB_WRITE_CONNECTION_STRING}`,
        isGlobal: true,
      }),
    AuthModule,
    TransactionModule,

  MongooseModule.forRoot(
    process.env.MONGODB_WRITE_CONNECTION_STRING,
      {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        //useCreateIndex:true,
        //useMongoClient:true
      }
    ),
  ],
})
export class AppModule {}
