import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { prestataireSchema } from './entities/prestataire.entity';
import { prestataireController } from './prestataire.controller';
import { prestataireService } from './prestataire.service';
import { ServicesSchema } from 'src/services/entities/service.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'responsable', schema:prestataireSchema},{ name: 'services', schema:ServicesSchema}])
   ],
  controllers: [prestataireController],
  providers: [prestataireService]
})
export class PrestataireModule {}
