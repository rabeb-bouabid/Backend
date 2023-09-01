import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inot } from './interface/notification.interface';
import { Model } from 'mongoose';


@Injectable()
export class NotificationService {
  constructor(@InjectModel('notifications') private NotModel: Model<Inot>) { }
  
  async getAllNotifications(): Promise<Inot[]> {
    const NotificationData = await this.NotModel.find().select("-__v");
    if (!NotificationData || NotificationData.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return NotificationData;
 
  }

  async getNotificaionById(notId: string): Promise<Inot[]> {
    const NotificationData = await this.NotModel.find().select("-__v");
    if (!NotificationData || NotificationData.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return NotificationData;
      } 

        async getNotif(notId: string): Promise<Inot[]> {
    const notifi=await this.NotModel.findOne({},{reservations:notId})
         const existingNotification = await this.NotModel.find(
         {notId:notifi._id}
        
        ).exec();
       
        if (!existingNotification) {
          throw new NotFoundException(`notification #${notId} not found`);
        }
        return existingNotification
        
      } 
      async deleteAllNotifications(): Promise<void> {
        await this.NotModel.deleteMany({});
      }
}
