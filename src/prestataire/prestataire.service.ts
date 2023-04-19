/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iprestataire } from './interface/prestataire.interface';
import { CreateprestataireDto } from './dto/create-prestataire.dto';
import { UpdateprestataireDto } from './dto/update-prestataire.dto';
import { IService } from 'src/services/interface/service.interface';

@Injectable()
export class prestataireService {
  constructor(
    @InjectModel('responsable') private prestataireModel: Model<Iprestataire>,
    @InjectModel('services') private ServicesModel: Model<IService>,
  ) {}
  async createprestataire(
    CreateprestataireDto: CreateprestataireDto,
  ): Promise<Iprestataire> {
    const newprestataire = await new this.prestataireModel(
      CreateprestataireDto,
    );
    await this.ServicesModel.findByIdAndUpdate(CreateprestataireDto.serviceId, {
      $push: { responsables: newprestataire },
    });
    return newprestataire.save();
  }
  async findById(id: string): Promise<Iprestataire> {
    return this.prestataireModel.findById(id);
  }

  async updateprestataire(
    prestataireId: string,
    UpdateprestataireDto: UpdateprestataireDto,
  ): Promise<Iprestataire> {
    const existingprestataire = await this.prestataireModel.findByIdAndUpdate(
      prestataireId,
      UpdateprestataireDto,
      { new: true },
    );
    if (!existingprestataire) {
      throw new NotFoundException(`prestataire #${prestataireId} not found`);
    }
    return existingprestataire;
  }

  async getprestataire(prestataireId: string): Promise<Iprestataire> {
    const existingprestataire = await this.prestataireModel.findById(
      prestataireId,
    ).exec();
    if (!existingprestataire) {
      throw new NotFoundException(`prestataire #${prestataireId} not found`);
    }
    return existingprestataire;
  }

async getprestataireByService(serviceId: string): Promise<Iprestataire[]> {
const service=await this.ServicesModel.findById(serviceId)
     const existingPrestataireByService = await this.prestataireModel.find(
     {serviceId:service._id}
    
    ).exec();
   
    if (!existingPrestataireByService) {
      throw new NotFoundException(`prestataire #${serviceId} not found`);
    }
    return existingPrestataireByService
    
  } 

  async deleteprestataire(prestataireId: string): Promise<Iprestataire> {
    const deletedprestataire = await this.prestataireModel.findByIdAndDelete(prestataireId,);
    await this.ServicesModel.findByIdAndUpdate(deletedprestataire.serviceId, 
      {$pull:{responsables:deletedprestataire._id}})
    if (!deletedprestataire) {
      throw new NotFoundException(`prestataire #${prestataireId} not found`);
    }
    return deletedprestataire;
  }

  async getprestataireByEmail(email: string): Promise<Iprestataire[]> {
    const existingprestataireByEmail = await this.prestataireModel.find({
      email: email,
    }).exec();
    if (!existingprestataireByEmail) {
      throw new NotFoundException(`prestataire #${email} not found`);
    }
    return existingprestataireByEmail;
  }
  async getAllprestataires(): Promise<Iprestataire[]> {
    const prestataireData = await this.prestataireModel.find().select('-__v');
    if (!prestataireData || prestataireData.length == 0) {
      throw new NotFoundException('prestataire data not found!');
    }
    return prestataireData;
  }
  async findByprestatairename(prestatairename: string): Promise<Iprestataire> {
    return this.prestataireModel.findOne({ prestatairename }).exec();
  }
}
