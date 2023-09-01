/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IntUser } from 'src/user/interface/user.interface';
import { Ifeedback } from './interface/feedback.interface';
import { CreatefeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Iprestataire } from 'src/prestataire/interface/prestataire.interface';

@Injectable()
export class FeedbackService {
  constructor(   
     @InjectModel('feedback') private feedbackModel: Model<Ifeedback>,
      @InjectModel('responsable') private responsableModel: Model<Iprestataire>,
     @InjectModel('user') private userModel: Model<IntUser>) {}
     async createfeedback(createfeedbackDto: CreatefeedbackDto): Promise<Ifeedback> {
      const newFeedback = await new this.feedbackModel(createfeedbackDto); 
      await this.userModel.findByIdAndUpdate(createfeedbackDto.userId, {
        $push: { feedback: newFeedback }
      });
      await this.responsableModel.findByIdAndUpdate(createfeedbackDto.prestataireId, {
        $push: { feedback: newFeedback },
      });
      return newFeedback.save();
    }

  
    async updatefeedback(FeedbackId: string, updateFeedbackDto: UpdateFeedbackDto): Promise<Ifeedback> {
      const existingfeedback = await this.feedbackModel.findByIdAndUpdate(FeedbackId, updateFeedbackDto, { new: true });
      if (!existingfeedback) {
        throw new NotFoundException(`feedback #${FeedbackId} not found`);
      }
      return existingfeedback;
    }

  async getfeedback(feedbackId: string): Promise<Ifeedback> {
    const existingfeedback = await this.feedbackModel.findById(
      feedbackId,
    ).populate('userId').exec();
    if (!existingfeedback) {
      throw new NotFoundException(`feedback #${feedbackId} not found`);
    }
    return existingfeedback;
  }

  async getFeedbackByPrestaId(prestaId: string): Promise<Ifeedback[]> {
    const existingFeedbackByPrestaId = await this.feedbackModel
    .find({prestataireId:prestaId })
    .populate('userId', 'username file -_id');


    if (!existingFeedbackByPrestaId) {
      throw new NotFoundException(`Prestataire #${prestaId} not found`);
    }

   
    return existingFeedbackByPrestaId;
  }


  async deletefeedback(feedbackId: string): Promise<Ifeedback> {
    const deletefeedback = await this.feedbackModel.findByIdAndDelete(feedbackId);
    if (!deletefeedback) {
      throw new NotFoundException(`feedback  #${feedbackId} not found`);
    }
    return deletefeedback;
  }
  
  async getAllfeedback(): Promise<Ifeedback[]> {
    const FeedbackData = await this.feedbackModel.find().populate('userId').select("-__v");
    if (!FeedbackData || FeedbackData.length == 0) {
      throw new NotFoundException('Feedback data not found!');
    }
    return FeedbackData;
  }

  async getfeedbackByUserId(userId: string): Promise<Ifeedback[]> {
    const feedback=await this.feedbackModel.findById(userId)
         const existingFeedbackByUserId = await this.feedbackModel.find(
         {userId:feedback._id}
        
        ).exec();
       
        if (!existingFeedbackByUserId) {
          throw new NotFoundException(`feedback by user Id #${userId} not found`);
        }
        return existingFeedbackByUserId
        
      } 
  
}
