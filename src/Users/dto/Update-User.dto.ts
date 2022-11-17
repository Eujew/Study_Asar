import { IsString, MinLength, MaxLength, IsNotEmpty, IsEnum, IsIn, IsOptional, IsEmail } from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { UserStatus } from "src/constants.enum";

export class updateUserDto{
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({
        example:'John Doe'
    })
    @IsNotEmpty()
    username:string;

    //@IsEnum(UserStatus,{each:true})
    //@IsIn([UserStatus.WORKER,UserStatus.MANAGER,UserStatus.ADMIN])
    @IsNotEmpty()
    @ApiProperty({enum:['WORKER','MANAGER','ADMIN']})
    readonly roles:Array<string>;

    @IsEmail()
    @ApiProperty({
        example:'mail@mail.ru'
    })
    @IsNotEmpty()
    readonly email:string;
}