import {ApiProperty,ApiPropertyOptional} from '@nestjs/swagger';
import {IsString,IsIn, IsDateString, IsMongoId, IsEnum, IsNotEmpty, IsNumber} from 'class-validator';
import { TaskStatus } from 'src/constants.enum';
import mongoose, { Date, ObjectId} from 'mongoose';

export class createTaskDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    title:string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    description:string;
    
    @IsMongoId()
    @ApiPropertyOptional()
    @IsNotEmpty()
    performers: string;

    @IsEnum(TaskStatus,{each:true})
    @IsNotEmpty()
    @IsIn([TaskStatus.CREATED])
    readonly condition: string;

    @IsDateString()
    @ApiProperty({
        example:new Date(Date.now())
    })
    deadline:Date;
    
    @IsMongoId()
    @ApiProperty()
    taskLord: string;

    @IsNumber()
    readonly payment: number;
    
    @IsNumber()
    readonly reward: number;


}