import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { notificationsController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from 'src/reservation/entities/reservation.entity';
import { notificationSchema } from './entities/notification.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'notifications', schema:notificationSchema},{ name: 'reservation', schema:ReservationSchema}])
   ],
  controllers: [notificationsController],
  providers: [NotificationService]
})
export class NotificationModule {}
