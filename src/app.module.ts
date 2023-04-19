import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { ReservationModule } from './reservation/reservation.module';
import { ServicesModule } from './services/services.module';
import { PrestataireModule } from './prestataire/prestataire.module';
import { ContactModule } from './contact/contact.module';





@Module({

  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', { dbName: 'crud'}),  UserModule,ConfigModule.forRoot({isGlobal:true}), AuthModule, AdminModule, ReservationModule,ServicesModule, PrestataireModule, ContactModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}