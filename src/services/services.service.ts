/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iadmin } from 'src/admin/entities/interfaces/admin.interface';
import { CreateServicesDto } from './dto/create-service.dto'; 
import { UpdateServicesDto } from './dto/update-service.dto'; 
import { IService } from './interface/service.interface';


@Injectable()
export class ServicesService {
  
  constructor(@InjectModel('Services') private ServicesModel: Model<IService>,
              @InjectModel('admin') private AdminModel: Model<Iadmin>,) { }
  async createServices(createServicesDto: CreateServicesDto): Promise<IService> {
    const newServices = await new this.ServicesModel(createServicesDto);
    // await this.AdminModel.findByIdAndUpdate(createServicesDto.adminId,{$push:{services:newServices}})
    return newServices.save();
  }
  async updateService(ServiceId: string, updateServiceDto: UpdateServicesDto): Promise<IService> {
    const existingService = await this.ServicesModel.findByIdAndUpdate(ServiceId, updateServiceDto, { new: true });
    if (!existingService) {
      throw new NotFoundException(`Service #${ServiceId} not found`);
    }
    return existingService;
  }
  async getAllServices(): Promise<IService[]> {
    const ServicesData = await this.ServicesModel.find().select('-__v');
    if (!ServicesData || ServicesData.length == 0) {
      throw new NotFoundException('Services data not found!');
    }
    return ServicesData;
  }
  async getService(ServiceId: string): Promise<IService> {
    const existingService = await this.ServicesModel.findById(ServiceId).exec();
    if (!existingService) {
      throw new NotFoundException(`Service #${ServiceId} not found`);
    }
    return existingService;

  }
 
  async deleteService(ServiceId: string): Promise<IService> {
    const deletedService = await this.ServicesModel.findByIdAndDelete(ServiceId);
    if (!deletedService) {
      throw new NotFoundException(`Service #${ServiceId} not found`);
    }
    return deletedService;
  }
}
