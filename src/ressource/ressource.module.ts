import { Module } from '@nestjs/common';
import { RessourceService } from './ressource.service';
import { RessourceController } from './ressource.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RessourceSchema } from './ressource.model';

@Module({
  controllers: [RessourceController],
  providers: [RessourceService],
  imports : [MongooseModule.forFeature([{name: 'Ressource', schema: RessourceSchema}])],
})
export class RessourceModule {}
