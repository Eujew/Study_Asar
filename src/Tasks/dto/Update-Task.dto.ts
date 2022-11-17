import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsIn, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "src/constants.enum";

export class updateTaskDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @IsString({each:true})
    @IsMongoId()
    @ApiProperty()
    @IsNotEmpty()
    performers: Array<string>;

    @IsEnum(TaskStatus,{each:true})
    @IsNotEmpty()
    @IsIn([TaskStatus.COMPLETE,TaskStatus.IN_PROGRESS])
    @ApiPropertyOptional({enum:['COMPLETE','IN_PROGRESS']})
    readonly condition: Array<string>;

    @IsDateString()
    @ApiProperty()
    deadline:Date;

    @IsString()
    @IsMongoId()
    @ApiProperty()
    taskLord: string;
}