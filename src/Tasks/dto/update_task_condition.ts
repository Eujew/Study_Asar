import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "src/constants.enum";

export class updateTaskConditionDto{
    @IsEnum(TaskStatus,{each:true})
    @IsNotEmpty()
    @IsIn([TaskStatus.COMPLETE,TaskStatus.IN_PROGRESS])
    @ApiPropertyOptional({enum:['COMPLETE','IN_PROGRESS']})
    readonly condition: Array<string>;
}