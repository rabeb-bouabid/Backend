/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { CreateReservationDto } from 'src/reservation/dto/create-reservation.dto';
import { IReservation } from 'src/reservation/interface/reservation.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IntUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private UserModel: Model<IntUser>) { }
  async createUser(createUserDto: CreateUserDto): Promise<IntUser> {
    const newUser = await new this.UserModel(createUserDto);
    return newUser.save();
  }
  async findById(id: string): Promise<IntUser>{
    return this.UserModel.findById(id);
  }
  
  async updateUser(UserId: string, UpdateUserDto: UpdateUserDto): Promise<IntUser> {
    const existinguser = await this.UserModel.findByIdAndUpdate(UserId, UpdateUserDto, { new: true });
    if (!existinguser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return existinguser;
  }
 
  async getUser(UserId: string): Promise<IntUser> {
    const existingUser = await this.UserModel.findById(UserId).populate('feedback').exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return existingUser;
  }
  
  async deleteUser(UserId: string): Promise<IntUser> {
    const deletedUser = await this.UserModel.findByIdAndDelete(UserId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return deletedUser;
  }
  
  async getUserByEmail(email: string): Promise<IntUser[]> {
    const existingUserByEmail = await this.UserModel.find({email:email}).exec();
    if (!existingUserByEmail) {
      throw new NotFoundException(`User #${email} not found`);
    }
    return existingUserByEmail;
  }
  /* async getAllUsers(): Promise<IntUser[]> {
    const UserData = await this.UserModel.find().populate('feedback').select("-__v");
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return UserData;
  } */
  async findByUsername(username: string): Promise<IntUser>{
    return this.UserModel.findOne({username}).exec();
  }
  async getAllUsers(): Promise<IntUser[]> {
    const UserData = await this.UserModel.find().select("-__v");
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return UserData;
  }
  
}