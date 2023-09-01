import { PartialType } from '@nestjs/mapped-types';
import { CreatefeedbackDto } from './create-feedback.dto';

export class UpdateFeedbackDto extends PartialType(CreatefeedbackDto) {}
