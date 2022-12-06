import { IsString, MinLength, MaxLength, IsNotEmpty, IsEnum, IsIn, IsOptional, IsEmail, IsNumber } from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { UserStatus } from "src/constants.enum";

export class createUserDto{
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({
        example:'John Doe'
    })
    @IsNotEmpty()
    username:string;

    @IsEnum(UserStatus,{each:true})
    @IsIn([UserStatus.WORKER,UserStatus.MANAGER,UserStatus.ADMIN])
    @IsNotEmpty()
    @ApiProperty({enum:['worker','manager','admin']})
    readonly roles:Array<string>;

    @IsString()
    @MinLength(10)
    @ApiProperty({
        example:'Parabellum'
})
    @IsNotEmpty()
    password:string;

    @IsEmail()
    @ApiProperty({
        example:'mail@mail.ru'
    })
    @IsNotEmpty()
    email:string;

    @IsNumber()
    balance:number = 0;
   
}

