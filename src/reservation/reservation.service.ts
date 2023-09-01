/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IService } from 'src/services/interface/service.interface';
import { IntUser } from 'src/user/interface/user.interface';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { IReservation } from './interface/reservation.interface';
import { NotificationService } from 'src/notification/notification.service';
import { In } from 'typeorm';
import { Inot } from 'src/notification/interface/notification.interface';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel('Reservation') private ReservationModel: Model<IReservation>,
    @InjectModel('user') private UserModel: Model<IntUser>,
    @InjectModel('services') private ServicesModel: Model<IService>,
    @InjectModel('responsable') private responsableModel: Model<Inot>,
    @InjectModel('notifications') private notificationsModel: Model<Inot>,
  ) {}
  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<IReservation> {
    const newReservation = await new this.ReservationModel(
      createReservationDto,
    );
    await this.UserModel.findByIdAndUpdate(createReservationDto.userId, {
      $push: { reservations: newReservation },
    });
    await this.ServicesModel.findByIdAndUpdate(createReservationDto.serviceId, {
      $push: { reservations: newReservation },
    });
    const notification = await new this.notificationsModel({
      message: ' Un nouvel utilisateur vient de réserver un service',
      userId: createReservationDto.userId,
      serviceId: createReservationDto.serviceId,
    }).save();
    await this.notificationsModel.findByIdAndUpdate(notification._id, {
      $push: { reservations: newReservation },
    });
    await this.responsableModel.findByIdAndUpdate(
      createReservationDto.PrestataireId,
      {
        $push: { reservations: newReservation },
      },
    );

    return newReservation.save();
  }

  async getReservationByUser(userId: string): Promise<IReservation[]> {
    const user = await this.UserModel.findById(userId);
    const existingReservationByUser = await this.ReservationModel.find({
      userId: user._id,
    }).exec();

    if (!existingReservationByUser) {
      throw new NotFoundException(`reservation #${userId} not found`);
    }
    return existingReservationByUser;
  }
  async updateReservation(
    ReservationId: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<IReservation> {
    const existingReservation = await this.ReservationModel.findByIdAndUpdate(
      ReservationId,
      updateReservationDto,
      { new: true },
    );
    if (!existingReservation) {
      throw new NotFoundException(`Reservation #${ReservationId} not found`);
    }
    return existingReservation;
  }
  async getAllReservation(): Promise<IReservation[]> {
    const ReservationData = await this.ReservationModel.find()
      .populate('serviceId')
      .populate('userId')
      .populate('PrestataireId')
      .select('-__v');
    if (!ReservationData || ReservationData.length == 0) {
      throw new NotFoundException('Reservation data not found!');
    }
    return ReservationData;
  }

  async getReservationById(reservationId: string): Promise<IReservation> {
    const existingReservation = await this.ReservationModel.findById(
      reservationId,
    ).populate('PrestataireId');
    if (!existingReservation) {
      throw new NotFoundException(`reservation #${reservationId} not found`);
    }
    return existingReservation;
  }

  async deleteReservation(ReservationId: string): Promise<IReservation> {
    const deletedReservation = await this.ReservationModel.findByIdAndDelete(
      ReservationId,
    );
    await this.UserModel.findByIdAndUpdate(deletedReservation.userId, {
      $pull: { reservations: deletedReservation._id },
    });
    await this.ServicesModel.findByIdAndUpdate(deletedReservation.serviceId, {
      $pull: { reservations: deletedReservation._id },
    });
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

    const ReservationData = await this.ReservationModel.find(query).select(
      '-__v',
    );

    if (!ReservationData || ReservationData.length === 0) {
      throw new NotFoundException('Reservation data not found!');
    }

    return ReservationData;
  }

  async getReservationByUserId(userId: string): Promise<IReservation[]> {
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      const reservations = await this.ReservationModel.find({ userId: userId })
        .populate('serviceId')
        .populate('userId')
        .populate('PrestataireId');
      if (reservations.length == 0) {
        throw new NotFoundException({ message: 'no reservation exist !' });
      }
      return reservations;
    } else {
      throw new NotFoundException({ message: 'Id is not correct !' });
    }
  }
}
