import { IsNotEmpty, IsString } from "class-validator";

export class CreatefeedbackDto {
    
    @IsString()
    @IsNotEmpty()
    commentaire: string;

    @IsString()
    @IsNotEmpty()
    userId:string;
    @IsString()
    @IsNotEmpty()
    prestataireId:string;
}

