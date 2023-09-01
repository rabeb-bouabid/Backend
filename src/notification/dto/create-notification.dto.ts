import { IsNotEmpty, IsString } from "class-validator";
export class CreateNotificationDto {

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString() 
    @IsNotEmpty()
    serviceId: string;

    @IsString()
    @IsNotEmpty()
     reservations: string;

     @IsString()
     @IsNotEmpty()
      Datedébut: Date

     @IsString()
     @IsNotEmpty()
      Datefin: Date;
      
}
