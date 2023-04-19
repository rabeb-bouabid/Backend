/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ServicesService } from './services.service'; 
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesSchema } from './entities/service.entity';
import { AdminSchema } from 'src/admin/entities/admin.entity';


@Module({
  imports:[MongooseModule.forFeature([{name:'Services', schema:ServicesSchema},{ name: 'admin', schema:AdminSchema}])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
