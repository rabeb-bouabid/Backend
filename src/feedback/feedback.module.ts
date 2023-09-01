import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { MongooseModule } from '@nestjs/mongoose';
import { feedbackSchema } from './entities/feedback.entity';
import { FeedbackController } from './feedback.controller';
import { userSchema } from 'src/user/entities/user.entity';
import { prestataireSchema } from 'src/prestataire/entities/prestataire.entity';
@Module({
  imports:[MongooseModule.forFeature([{ name: 'feedback', schema:feedbackSchema},{ name: 'user', schema:userSchema},{ name: 'responsable', schema:prestataireSchema}])
   ],
  controllers: [FeedbackController],
  providers: [FeedbackService]
})
export class FeedbackModule {}
