import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.model';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>) {}    

    async getAllUsers() {
        // get all users from mongoDB
        const users = await this.userModel.find().exec();

        return users as User[];
    }
    
    async getUser(name: String) {
        // get all users from mongoDB
        const user = await this.userModel.findOne({
            name: name
        })
        if(!user)
            throw new NotFoundException('User not found');
        return user as User;
    }
    
    async insertUser(name: String,email: String, password: String) {
        const newUser = new this.userModel({name: name, email: email, password: password});
        const result = await newUser.save();
        return result;
    }

    async deleteUser(name: String) {
        const result = await this.userModel.deleteOne({name:name}).exec();
        // check if user exists
        if(result.deletedCount > 0)
            return {message:'User deleted'};
        else
            throw new NotFoundException('User not found')
    }
            
}
