import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Icontact } from './interface/contact.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getMessage(contactId: string): Promise<string> {
      const contact = await this.ContactModel.findById(contactId).exec();
      if (!contact) {
        throw new NotFoundException('Contact not found');
      }
      return contact.message;
    }
    async deleteContact(contactId: string): Promise<void> {
      const deletedContact = await this.ContactModel.findByIdAndDelete(contactId).exec();
      if (!deletedContact) {
        throw new NotFoundException('Contact not found');
      }
    }
    async deleteAllMsg(): Promise<void> {
      const deleteAllMsg = await this.ContactModel.deleteMany().exec();
      if (!deleteAllMsg) {
        throw new NotFoundException('message not found');
      }
    }
   
}
