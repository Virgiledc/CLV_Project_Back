import * as mongoose from 'mongoose';
import {ApiProperty, ApiBody } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsString, IsNotEmpty } from 'class-validator';

export const RessourceSchema = new mongoose.Schema({
  id : Number,
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image_path: { type: String, required: false },
    
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
});

export interface Ressource {
  title: string;
  description: string;
  content : string;
  image_path: any;
}

export class RessourceCreateDto {
  @ApiProperty({ description: 'The title of the ressource' })
  title: string;

  @ApiProperty({ description: 'The description of the ressource' })
  description: string;

  @ApiProperty({ description: 'The content of the ressource' })
  content: string;

  image_path: string;
}

export class ImageDto {
  @ApiProperty({ type: 'string', format: 'binary'})
  image: any;
}