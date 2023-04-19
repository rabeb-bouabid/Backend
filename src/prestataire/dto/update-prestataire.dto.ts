import { PartialType } from '@nestjs/mapped-types';
import { CreateprestataireDto } from './create-prestataire.dto';

export class UpdateprestataireDto extends PartialType(
  CreateprestataireDto,
) {}
