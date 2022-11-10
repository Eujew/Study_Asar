import { Controller, Post,Body,Get,Param } from "@nestjs/common";
import { createUserDto } from "./dto/createUsers.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor (private readonly userService: UserService){}

    @Post()
    async create(@Body() createUserDto: createUserDto){
        await this.userService.create(createUserDto);
    }

     @Get(':id')
     async find(@Param('id') id:string) {
         return this.userService.find(id)
     }
}