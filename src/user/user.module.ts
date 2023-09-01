/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { feedbackSchema } from 'src/feedback/entities/feedback.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'user', schema:userSchema}])
],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
