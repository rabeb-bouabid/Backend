/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { IsNotEmpty, IsString } from "class-validator";


export class CreateServicesDto {
    @IsString()
    @IsNotEmpty()
    readonly SeviceName: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly price: number;
    
    @IsString()
    @IsNotEmpty()
    adminId: string;

     file: string;

   
}
