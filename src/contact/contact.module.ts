import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { contactSchema } from './entities/contact.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'contact', schema:contactSchema}])
   ],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
