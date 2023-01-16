import * as mongoose from 'mongoose';
import {ApiProperty } from '@nestjs/swagger';

export const UserSchema = new mongoose.Schema({
    id : Number,
    name : String,
    email : String,
    password : String,
    
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
});

export interface User {
    name : String;
    email : String;
    password : String;
    roles : String[];
}

export class UserCreateDto {
    @ApiProperty()
    name : String;
    @ApiProperty()
    email : String;
    @ApiProperty()
    password : String;
}