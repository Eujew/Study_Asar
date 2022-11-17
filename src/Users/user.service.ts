import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {  Model } from "mongoose";
import { createUserDto } from "./dto/createUsers.dto";
import { updateUserDto } from "./dto/Update-User.dto";
import { Users} from "./schema/user.schema";

@Injectable()
export class UserService{
    constructor(
        @InjectModel('User') private readonly UserModel: Model<Users>
    ){}

    async create(createUserDto:createUserDto) {
         const createdUser = new this.UserModel(createUserDto);
         return await createdUser.save();
    }

     async findAll():Promise<Users[]>{
         return await this.UserModel.find().exec();
     }

     async findOne(id:string){
         return await this.UserModel.findById(id).exec();
     }

     async update(id: string, UpdateUserDto:updateUserDto) {
         return await this.UserModel.findByIdAndUpdate(id, UpdateUserDto);
     }

     async deleteUser(id:string){
         return this.UserModel.findByIdAndDelete(id);
        
     }

}