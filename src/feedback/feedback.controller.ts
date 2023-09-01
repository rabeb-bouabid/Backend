/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Post, Put, Res,UploadedFile,UseInterceptors,UploadedFiles } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { FeedbackService } from './feedback.service';
import { CreatefeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';


@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }
  @Post()
  async createFeedback(@Res() response, @Body() CreatefeedbackDto: CreatefeedbackDto,)  {
    try {
    
      const newFeedback = await this.feedbackService.createfeedback(CreatefeedbackDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'new Feedback has been created successfully',
        status: HttpStatus.OK,
        data: newFeedback
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Feedback not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')
  async updatefeedback(@Res() response, @Param('id') FeedbackId: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    try {
      const existinguser = await this.feedbackService.updatefeedback(FeedbackId, updateFeedbackDto);
      return response.status(HttpStatus.OK).json({
        message: 'feedback has been successfully updated',
        data: existinguser,
        status: HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  

  @Get()
  async getAllFeedback(@Res() response) {
    try {
      const FeedbackData = await this.feedbackService.getAllfeedback();
      return response.status(HttpStatus.OK).json({
        message: 'All feedback data found successfully',
        status: HttpStatus.OK,
        data: FeedbackData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
 
  @Get('/:id')
  async getFeedback(@Res() response, @Param('id') FeedbackId: string) {
    try {
      const existingFeedback = await
        this.feedbackService.getfeedback(FeedbackId);
      return response.status(HttpStatus.OK).json({
        message: 'Feedback found successfully',
        data: existingFeedback,
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
  

  @Delete('/:id')
  async deleteFeedback(@Res() response, @Param('id') FeedbackId: string) {
    try {
      const deletedFeedback = await this.feedbackService.deletefeedback(FeedbackId);
      return response.status(HttpStatus.OK).json({
        message: 'Feedback deleted successfully',
        status: HttpStatus.OK,
        data: deletedFeedback,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  

  @Get('getfeedbackByUserId/:id')
  async getfeedbackByUserId(@Res() response, @Param('id') userId: string) {
    try {
      const existingfeedbackByUserId = await this.feedbackService.getfeedbackByUserId(
        userId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'feedback By user Id found successfully',
        data: existingfeedbackByUserId,
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
  @Get('getfeedbackByPrestaId/:id')
  async getfeedbackByPrestaId(@Res() response, @Param('id') prestataireId: string) {
    try {
      const existingFeedbackByPrestaId = await this.feedbackService.getFeedbackByPrestaId(prestataireId);
      return response.status(HttpStatus.OK).json({
        message: 'feedbackByPrestaId',
        data: existingFeedbackByPrestaId,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
  
}