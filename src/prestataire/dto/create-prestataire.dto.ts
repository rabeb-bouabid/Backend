import { IsNotEmpty, IsString } from "class-validator";

export class CreateprestataireDto {
    
    @IsString()
    @IsNotEmpty()
    fullname: string;
    @IsString()
    @IsNotEmpty()
    serviceId: string;
    @IsString()
    @IsNotEmpty()
    adresse: string;
    @IsString()
    @IsNotEmpty()
    telephone: string;
    @IsString()
    @IsNotEmpty()
    servicename: string;
    @IsString()
    @IsNotEmpty()
    detail: string;
    @IsString()
    @IsNotEmpty()
    experience: string;
    @IsString()
    @IsNotEmpty()
    certification: string;
    @IsString()
    @IsNotEmpty()
    file: string
    @IsString()
    @IsNotEmpty()
    files: string
    
}
