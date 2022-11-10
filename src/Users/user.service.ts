import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createUserDto } from "./dto/createUsers.dto";
import { Users } from "./schema/user.schema";

@Injectable()
export class UserService{
    constructor(
        @InjectModel('User') private readonly UserModel: Model<Users>
    ){}

    async create(createUserDto:createUserDto) {
        const createdUser = new this.UserModel(createUserDto);
        return await createdUser.save();
    }

     async find(id: string){
          return await this.UserModel.findById(id).exec();
     }
}