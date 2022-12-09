import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsNotEmpty, IsString} from "class-validator";
import { ObjectId } from "mongoose";

export class updateTaskDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    @ApiProperty()
    deadline:Date;

    @IsMongoId()
    @ApiProperty()
    @IsNotEmpty()
    performers: ObjectId;

}