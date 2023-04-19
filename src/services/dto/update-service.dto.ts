
import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesDto } from './create-service.dto';

export class UpdateServicesDto extends PartialType(CreateServicesDto) {}
