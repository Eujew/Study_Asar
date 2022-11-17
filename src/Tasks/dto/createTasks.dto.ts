import {ApiProperty,ApiPropertyOptional} from '@nestjs/swagger';
import {IsString, IsOptional,IsIn, IsDateString, IsMongoId, IsEnum, IsNotEmpty} from 'class-validator';
import { TaskStatus } from 'src/constants.enum';
import mongoose, { Date } from 'mongoose';

export class createTaskDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    name:string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    description:string;

    @IsString({each:true})
    @IsMongoId()
    @ApiProperty()
    @IsNotEmpty()
    performers: Array<string>;

    @IsEnum(TaskStatus,{each:true})
    @IsNotEmpty()
    @IsIn([TaskStatus.COMPLETE,TaskStatus.IN_PROGRESS])
    @ApiPropertyOptional({enum:['complete','in progress']})
    readonly condition: Array<string>;

    @IsDateString()
    @ApiProperty({
        example:new Date(Date.now())
    })
    deadline:Date;
    
    @IsString()
    @IsMongoId()
    @ApiProperty()
    taskLord: string;
}