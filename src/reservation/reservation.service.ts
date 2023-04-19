/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IService } from 'src/services/interface/service.interface';
import { IntUser } from 'src/user/interface/user.interface';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { IReservation } from './interface/reservation.interface';

@Injectable()
export class ReservationService {
  
  constructor(@InjectModel('Reservation') private ReservationModel: Model<IReservation>,
  @InjectModel('user') private UserModel: Model<IntUser>,
  @InjectModel('services') private ServicesModel: Model<IService>,) { }
  async createReservation(createReservationDto: CreateReservationDto): Promise<IReservation> {
    const newReservation = await new this.ReservationModel(createReservationDto);
    await this.UserModel.findByIdAndUpdate(createReservationDto.userId,{$push:{reservations:newReservation}})
    await this.ServicesModel.findByIdAndUpdate(createReservationDto.serviceId,{$push:{reservations:newReservation}})

    return newReservation.save();

  }
  async updateReservation(ReservationId: string, updateReservationDto: UpdateReservationDto): Promise<IReservation> {
    const existingReservation= await this.ReservationModel.findByIdAndUpdate(ReservationId, updateReservationDto, { new: true });
    if (!existingReservation) {
      throw new NotFoundException(`Reservation #${ReservationId} not found`);
    }
    return existingReservation;
  }
  async getAllReservation(): Promise<IReservation[]> {
    const ReservationData = await this.ReservationModel.find().select("-__v")
    if (!ReservationData || ReservationData.length == 0) {
      throw new NotFoundException('Reservation data not found!');
    }
    return ReservationData;
  }
  async getReservation(ReservationId: string): Promise<IReservation> {
    const existingReservation = await this.ReservationModel.findById(ReservationId).exec();
    if (!existingReservation) {
      throw new NotFoundException(`Reservation #${ReservationId} not found`);
    }
    return existingReservation;

  }
 
  async deleteReservation(ReservationId: string): Promise<IReservation> {
    const deletedReservation = await this.ReservationModel.findByIdAndDelete(ReservationId)
    await this.UserModel.findByIdAndUpdate(deletedReservation.userId, 
      {$pull:{reservations:deletedReservation._id}})
      await this.ServicesModel.findByIdAndUpdate(deletedReservation.serviceId, 
        {$pull:{reservations:deletedReservation._id}})
    if (!deletedReservation) {
      throw new NotFoundException(`Reservation #${ReservationId} not found`);
    }
    return deletedReservation;
  }
  async getAReservation(searchText?: string): Promise<IReservation[]> {
    let query = {};
    if (searchText && searchText !== '') {
      query = { name: { $regex: searchText, $options: 'i' } };
    }

    const ReservationData = await this.ReservationModel.find(query).select('-__v');

    if (!ReservationData || ReservationData.length === 0) {
      throw new NotFoundException('Reservation data not found!');
    }

    return ReservationData;
  }
}
