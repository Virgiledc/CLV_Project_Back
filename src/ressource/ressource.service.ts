import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ressource } from './ressource.model';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RessourceService {
    constructor(@InjectModel('Ressource') private readonly ressourceModel:Model<Ressource>) {}    
    
    async getAllRessources() {
        // get all ressources from mongoDB
        const ressources = await this.ressourceModel.find().exec();

        return ressources;
    }

    async getRessource(id: String) {
        // get a ressource from mongoDB
        const ressource = await this.ressourceModel.findOne({
            _id: id
        })
        console.log(ressource);
        if(!ressource)
            throw new NotFoundException('Ressource not found');

        return ressource;
    }
    async createRessource(ressource: Ressource) {
        const newRessource = new this.ressourceModel(ressource);
        const result = await newRessource.save();
        
        return result._id;
    }

}
