import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from './entities/reservation.entity';
import { userSchema } from 'src/user/entities/user.entity';
import { ServicesSchema } from 'src/services/entities/service.entity';
@Module({
  imports:[MongooseModule.forFeature([{name:'Reservation', schema:ReservationSchema},{ name: 'user', schema:userSchema},{ name: 'services', schema:ServicesSchema}])
   ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
