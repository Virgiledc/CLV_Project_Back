import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './user.model';
import * as bcrypt from 'bcrypt';
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
    
    async getUser(email: String) {
        // get all users from mongoDB
        const user = await this.userModel.findOne({
            email: email
        })
        if(!user)
            throw new NotFoundException('User not found');
        return user as User;
    }
    
    async insertUser(name: String,email: String, password: string) {
        // check if user exists
        const user = await this.userModel.findOne({
            email: email
        })
        if(user)
            throw new NotFoundException('User already exists');
        
        const newUser = new this.userModel({name: name, email: email, password: await bcrypt.hash(password,10)});
        const result = await newUser.save();
        // return user name and email
        return {name: result.name, email: result.email};
    }

    async deleteUser(email: String) {
        const result = await this.userModel.deleteOne({email:email}).exec();
        // check if user exists
        if(result.deletedCount > 0)
            return {message:'User deleted'};
        else
            throw new NotFoundException('User not found')
    }
            
}
