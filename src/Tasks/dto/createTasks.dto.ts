import {ApiProperty,ApiPropertyOptional} from '@nestjs/swagger';
import {IsString,IsIn, IsDateString, IsMongoId, IsEnum, IsNotEmpty, IsArray, IsNumber, IsInt, IsBoolean} from 'class-validator';
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
    performers: ObjectId;

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
    taskLord: ObjectId;

    @IsNumber()
    readonly payment: number;
    
    @IsNumber()
    readonly reward: number;

    @IsBoolean()
    readonly Done: boolean;

}