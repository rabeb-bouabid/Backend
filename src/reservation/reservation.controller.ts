import { Controller, Get, Post, Body, Patch, Put, Param, Delete , Res, HttpStatus, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inot } from 'src/notification/interface/notification.interface';

@Controller('Reservation')
export class ReservationController {

  
  
  @Get('getRsrvByUserId/:id')
  async getReservationByUser(@Res() response, @Param('id') userId: string) {
    try {
      const existingReservationByUser = await this.reservationService.getReservationByUserId(
        userId,
      );
      
      return response.status(HttpStatus.OK).json({
        message: 'Reservation By User found successfully',
        data: existingReservationByUser,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
  constructor(private readonly reservationService: ReservationService) {}
  @Get('/:id')
  async GetReservation(@Res() response, @Param('id') ReservationId: string) {
    try {
      const existingReservation = await
        this.reservationService.getReservationById(ReservationId);
      return response.status(HttpStatus.OK).json({
        message: 'Reservation found successfully',
        data: existingReservation,
        status:HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  } 

  @Post()
  async CreateReservation(@Res() response, @Body() createReservationDto: CreateReservationDto) {
    try {
      const newReservation = await this.reservationService.createReservation(createReservationDto);
      const notId = newReservation._id;
      /* const getNotificaionById = await this.reservationService.getNotificaionById(
        notId,
      ); */
      // async findById(id: string): Promise<Iadmin>{
      //   return this.AdminModel.findById(id);
      // }
      return response.status(HttpStatus.CREATED).json({
        message: 'Reservation has been created successfully',
        status: HttpStatus.OK,
        data: newReservation
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Reservation not created!' + err,
        data: null
      });
    }

  }

  @Get()
  async getAllReservation(@Res() response) {
    try {
      const ReservationData = await this.reservationService.getAllReservation();
      return response.status(HttpStatus.OK).json({
        message: 'All reservation data found successfully',
        status: HttpStatus.OK,
        data: ReservationData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  

  @Put('UpdateReservation/:id')
  async UpdateReservation(@Res() response, @Param('id') ReservationId: string, @Body() UpdateReservationDto: UpdateReservationDto) {
    try {
      const existingReservation = await this.reservationService.updateReservation(ReservationId, UpdateReservationDto);
      return response.status(HttpStatus.OK).json({
        message: 'Reservation has been successfully updated',
        data: existingReservation,
        status: HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  @Delete('DeleteReservation/:id')
  async DeleteReservation(@Res() response, @Param('id') ReservationId: string) {
    try {
      const deletedReservation = await this.reservationService.deleteReservation(ReservationId);
      return response.status(HttpStatus.OK).json({
        message: 'Reservation deleted successfully',
        status: HttpStatus.OK,
        data: deletedReservation,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  /* @Get()
  async getAReservation(@Query('search') searchText: string) {
    const ReservationData = await this.reservationService.getReservation(searchText);
    return { message: 'All Reservation data found successfully', status: 200, data: ReservationData };
  } */





}
 



