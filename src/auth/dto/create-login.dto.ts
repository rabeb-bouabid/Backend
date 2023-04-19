import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
  

}

