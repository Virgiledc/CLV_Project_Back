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
    name : string;
    email : string;
    password : string;
    roles : string[];
}

export class UserCreateDto {
    @ApiProperty()
    name : string;
    @ApiProperty()
    email : string;
    @ApiProperty()
    password : string;
}

export class UserConnect {
    @ApiProperty()
    username : string;
    @ApiProperty()
    password : string;
}