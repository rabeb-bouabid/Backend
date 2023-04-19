import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Icontact } from './interface/contact.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ContactService {
  constructor(@InjectModel('contact') private ContactModel: Model<Icontact>) { }
  async createContact(createContactDto: CreateContactDto): Promise<Icontact> {
    const newcontact = await new this.ContactModel(createContactDto);
    return newcontact.save();
  }
    async processFormData(formData: CreateContactDto) : Promise<Icontact> {
      const newcontact = await new this.ContactModel(formData);
      return newcontact.save();
    }


    async getContacts(): Promise<Icontact[]> {
      return this.ContactModel.find().exec();
    }
}
