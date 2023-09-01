
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username: string
    @IsString()
    @IsNotEmpty()
    nom: string;
    @IsString()
    @IsNotEmpty()
    prenom: string;
    @IsString()
    @IsNotEmpty()
    adresse: string;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
   
    @IsString()
    @IsNotEmpty()
    file: string;
    reservation: string;
    readonly refreshtoken: string;
}
