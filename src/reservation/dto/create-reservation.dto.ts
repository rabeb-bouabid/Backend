import { IsNotEmpty, IsString } from "class-validator";


export class CreateReservationDto {
    @IsString()
    @IsNotEmpty()
     Datedébut: Date
    @IsString()
    @IsNotEmpty()
     Datefin: Date;
    @IsString()
    @IsNotEmpty()
    TypeService: string;
    @IsString()
    @IsNotEmpty()
    TypeEtablissement: string;

    @IsString()
    @IsNotEmpty()
    MontantTotal: number;

    @IsString()
    @IsNotEmpty()
     userId: string;

     @IsString()
     @IsNotEmpty()
      serviceId: string;
}

