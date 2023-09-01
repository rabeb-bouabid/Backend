import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { contactentity } from './entities/contact.entity';
import * as nodemailer from 'nodemailer'
import {HttpStatus,Query,Put,Res,} from '@nestjs/common';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  
  async submitContactForm(@Body() formData: CreateContactDto) {
    
    await this.contactService.processFormData(formData);
    return { message: 'Formulaire envoyé avec succès' };
  }

  @Get('getMessages/:id')
  async getMessages(@Res() response, @Param('id') ContactId: string) {
    try {
      const existingMessages = await this.contactService.getMessage(
        ContactId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Message found successfully',
        data: existingMessages,
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
    
  
  @Get()
  async getContacts() {
    const contacts = await this.contactService.getContacts();
    return contacts;
  }
   @Delete(':id')
  async deleteContact(@Res() response, @Param('id') contactId: string) {
    try {
      const deletedService = await this.contactService.deleteContact(contactId);
      return response.status(HttpStatus.OK).json({
        message: 'Contact deleted successfully',
        status: HttpStatus.OK,
        data: deletedService,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  @Delete()
  async deleteAllMsg(@Res() response,  ) {
    try {
      const deletedService = await this.contactService.deleteAllMsg();
      return response.status(HttpStatus.OK).json({
        message: 'message deleted successfully',
        status: HttpStatus.OK,
        data: deletedService,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

}

