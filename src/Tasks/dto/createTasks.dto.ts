import {ApiProperty,ApiPropertyOptional} from '@nestjs/swagger';
import {IsString, IsOptional,IsIn, IsDateString, IsMongoId} from 'class-validator';
import { taskStatus } from '../schema/taskStatus.enum';
import mongoose, { Date } from 'mongoose';

export class createTaskDto {
    @IsString()
    @ApiProperty()
    name:string;

    @IsString()
    @ApiProperty()
    description:string;

    @IsString()
    @IsMongoId()
    @ApiProperty()
    performers: string[];

    @IsOptional()
    @IsIn([taskStatus.COMPLETE,taskStatus.IN_PROGRESS])
    @ApiPropertyOptional({enum:['COMPLETE','IN_PROGRESS']})
    readonly condition: taskStatus;

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