import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class TransactionDto {
    @IsString()
    @ApiProperty()
    description:string;

    @IsString()
    typeOfOpperation:string;

    @IsNumber()
    debit: number;

    @IsNumber()
    credit: number;   

}