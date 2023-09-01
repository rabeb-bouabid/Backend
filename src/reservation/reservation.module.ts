import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from './entities/reservation.entity';
import { userSchema } from 'src/user/entities/user.entity';
import { ServicesSchema } from 'src/services/entities/service.entity';
import { notificationSchema } from 'src/notification/entities/notification.entity';
import { NotificationService } from 'src/notification/notification.service';
import { prestataireSchema } from 'src/prestataire/entities/prestataire.entity';
@Module({
  imports:[MongooseModule.forFeature([
  {name:'Reservation', schema:ReservationSchema},
  { name: 'user', schema:userSchema},
  { name: 'services', schema:ServicesSchema},
  { name: 'notifications', schema:notificationSchema},
  { name: 'responsable', schema:prestataireSchema}
])
   ],
  controllers: [ReservationController],
  providers: [ReservationService , NotificationService],
})
export class ReservationModule {}
