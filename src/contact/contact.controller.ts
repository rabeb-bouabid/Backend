import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { contactentity } from './entities/contact.entity';
import * as nodemailer from 'nodemailer'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  
  async submitContactForm(@Body() formData: CreateContactDto) {
    
    await this.contactService.processFormData(formData);
    return { message: 'Formulaire envoyé avec succès' };
  }

  @Get()
  async getContacts() {
    const contacts = await this.contactService.getContacts();
    return contacts;
  }


  @Post()
  async createContact(@Body() createContactDto: CreateContactDto) {
    const { username, email, message } = createContactDto;
    await this.sendEmail(username, email, message);
    return this.contactService.createContact(createContactDto);
  }

  
  async sendEmail(name: string, email: string, message: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'rahmal@gmail.com',
        pass: '123',
      },
    });

  
    const mailOptions = {
      from: 'your-email@example.com',
      to: 'rabeb@gmail.com',
      subject: 'Nouveau message de contact',
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

  
    await transporter.sendMail(mailOptions);
  }

}

