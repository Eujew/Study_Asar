import { Controller, Post,Body,Get,Param, Put,Delete } from "@nestjs/common";
import { createUserDto } from "./dto/createUsers.dto";
import { updateUserDto } from "./dto/Update-User.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor (private readonly userService: UserService){}

    @Post()
    async create(@Body() createUserDto: createUserDto){
        await this.userService.create(createUserDto);
    }

     @Get()
     async findAll() {
         return this.userService.findAll()
     }

     @Get(':id')
     async findOne(@Param('id') id: string){
        return this.userService.findOne(id)
     }

     @Put(':id')
     update(@Param('id') id:string, @Body() UpdateUserDto:updateUserDto){
        return this.userService.update(id, UpdateUserDto);
     }

     @Delete(':id')
     deleteGuide(@Param('id') id: string) {
          return this.userService.deleteUser(id);
         
}
}