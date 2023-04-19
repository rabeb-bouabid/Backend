import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string
    @IsString()
    @IsNotEmpty()
    readonly phone: string
    @IsEmail() 
    @IsNotEmpty()
    readonly email: string
    @IsString()
    @IsNotEmpty()
    readonly subject: string
    
    @IsString()
    @IsNotEmpty()
    readonly message: string;
}
