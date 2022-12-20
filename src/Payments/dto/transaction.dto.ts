import { IsNumber, IsNumberString, IsString } from "class-validator";

export class TransactionDto {

    @IsNumberString()
    UserId:number;

    @IsString()
    typeOfOpperation:string;

    @IsNumber()
    debit: number;

    @IsNumber()
    credit: number;   

}