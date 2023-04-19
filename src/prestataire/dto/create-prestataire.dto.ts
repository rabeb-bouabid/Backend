import { IsNotEmpty, IsString } from "class-validator";

export class CreateprestataireDto {
    @IsString()
    @IsNotEmpty()
    Fullname: string;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString() 
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
     
    file: string
    
    @IsString()
    @IsNotEmpty()
     serviceId: string;
}
