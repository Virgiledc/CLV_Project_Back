import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RessourceService } from './ressource.service';
import { RessourceCreateDto, ImageDto } from './ressource.model';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { of } from 'rxjs';
import { ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('ressource')
@Controller('ressource')
export class RessourceController {
  constructor(private readonly ressourceService: RessourceService) {}

  @Get()
  async getAllRessources() {
    const ressources = await this.ressourceService.getAllRessources();
    return ressources;
  }

  @Get(':id')
  async getRessource(@Param('id') id: string) {
    const ressource = await this.ressourceService.getRessource(id);
    return ressource;
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  async createRessource(@Body() ressourceService: RessourceCreateDto) {
    return this.ressourceService.createRessource(ressourceService);
  }

  @ApiBearerAuth()
  @Post('/image/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload an image with the id of the ressource' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
    destination: './uploads',
    filename: (req, image, cb) => {
        const filename = image.originalname.split('.')[0] + Date.now();
        const extension = '.' + image.originalname.split('.')[1];
        cb(null, `${filename}${extension}`);
    }
        })
    }))
    async uploadFile(@Body() imageDto: ImageDto, @UploadedFile() image, @Param('id') id: string) {
        const ressource = await this.ressourceService.getRessource(id);
        ressource.image_path = image.path;
        ressource.save();
        return of({imagePath: image.path});
    }

}
