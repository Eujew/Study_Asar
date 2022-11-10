import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Users/user.module';
import { TaskModule } from './Tasks/task.module';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    UserModule,
    TaskModule,
    
  ConfigModule.forRoot({
    envFilePath: `env.${environment}`,
    isGlobal: true,
  }),
  MongooseModule.forRoot(
    process.env.MONGODB_WRITE_CONNECTION_STRING,
      {
        useNewUrlParser:true,
        useUnifiedTopology:true
      }
    ),
  ],
})
export class AppModule {}
