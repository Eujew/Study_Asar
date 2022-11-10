import { IsString, MinLength, MaxLength, IsNotEmpty, IsEnum } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import { Roles } from "../schema/user.roles.enum";

export class createUserDto{
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({
        example:'John Doe'
    })
    @IsNotEmpty()
    username:string;

    @IsEnum(Roles)
    @ApiProperty({
        example: 'manager'
    })
    role:Roles;

    @IsString()
    @MinLength(10)
    @ApiProperty({
        example:'Parabellum'
})
    @IsNotEmpty()
    password:string;

    @ApiProperty({
        example:'mail@mail.ru'
    })
    @IsNotEmpty()
    email:string;
   
}