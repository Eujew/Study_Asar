import { ApiPropertyOptional} from "@nestjs/swagger";
import {  IsEnum, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "src/constants.enum";

export class updateTaskConditionDto{
    @IsEnum(TaskStatus,{each:true})
    @IsNotEmpty()
    @IsIn([TaskStatus.COMPLETE])
    @ApiPropertyOptional(
        {enum:['complete'],default:'complete'})
    readonly condition: string ;

}