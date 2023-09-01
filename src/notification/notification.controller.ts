
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { diskStorage } from 'multer';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';


@Controller('notifications')
export class notificationsController {
  constructor(private readonly notificationsService: NotificationService) { }

 
  @Get('getAllNotifications')
  async getAllNotifications(@Res() response) {
    try {
      const NotificationData = await this.notificationsService.getAllNotifications();
      return response.status(HttpStatus.OK).json({
        message: 'All Notifications data found successfully',
        status: HttpStatus.OK,
        data: NotificationData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
}

  @Get('getNotif/:id')
  async GetNotificaion(@Res() response, @Param('id') NotId: string) {
    try {
      const existingNotification = await this.notificationsService.getNotif(NotId);
      return response.status(HttpStatus.OK).json({
        message: 'Notification found successfully',
        data: existingNotification,
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
  @Delete('deleteAllNotifications')
  async deleteAllNotifications(@Res() response) {
    try {
      await this.notificationsService.deleteAllNotifications();
      return response.status(HttpStatus.OK).json({
        message: 'All notifications deleted successfully',
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
}