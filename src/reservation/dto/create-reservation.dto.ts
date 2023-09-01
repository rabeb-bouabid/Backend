import { IsNotEmpty, IsString } from "class-validator";

export class CreateReservationDto {
    @IsString()
    @IsNotEmpty()
    datedebut: Date;

    @IsString()
    @IsNotEmpty()
    heure: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    serviceName: string;

    @IsString()
    @IsNotEmpty()
    serviceId: string;

    @IsString()
    @IsNotEmpty()
    adresse: string;

    @IsString()
    @IsNotEmpty()
    notifications: string;

    @IsString()
    @IsNotEmpty()
    PrestataireId: string;
}
