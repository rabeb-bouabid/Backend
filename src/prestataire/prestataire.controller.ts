/* eslint-disable prettier/prettier */
import {Body,Controller,Delete,Get,HttpStatus,Param,Query,Post,Put,Res,UploadedFile,BadRequestException,UseInterceptors,UploadedFiles,} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CreateprestataireDto } from './dto/create-prestataire.dto';
import { UpdateprestataireDto } from './dto/update-prestataire.dto';
import { prestataireService } from './prestataire.service';

@Controller('prestataire')
export class prestataireController {
  constructor(private readonly prestataireService: prestataireService) {}
  @Post('/workImages')
  @UseInterceptors(
    FilesInterceptor('files', 2, {
        storage:diskStorage({
        destination: './upload/workImages',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async workImg(@Res() response, @Body() createprestataireDto: CreateprestataireDto,@UploadedFiles() files) {
    try {
      createprestataireDto.files = files.map(item=>item.filename);//item c'est un compteur
      const newCategory = await this.prestataireService.createprestataire(createprestataireDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'workImages has been created successfully',
        status: HttpStatus.OK,
        data: newCategory
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: workImages not created!' + err,
        data: null
      });
    }
  }
  @Post()
  @UseInterceptors(
  FileInterceptor('file',{
    storage: diskStorage({
      destination: './upload/imagesprestataire',
      filename: (_request, file, callback) =>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
    }),
  }),
)
async createPrestataire(
  @Res() response,
  @Body() createPrestataireDto: CreateprestataireDto,createprestataireDto: CreateprestataireDto,
  @UploadedFile() file,
) {
  try {
    createPrestataireDto.file = file.filename;
    
    const newPrestataire = await this.prestataireService.createprestataire(createPrestataireDto);
    return response.status(HttpStatus.CREATED).json({
      message: 'Le prestataire a été créé avec succès',
      status: HttpStatus.OK,
      data: newPrestataire,
    });
  } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      status: 400,
      message: 'Erreur : le prestataire n\'a pas pu être créé ! ' + err,
      data: null,
    });
  }
}
   @Get('getPrestatireByService/:id')
  async getprestataireByService(@Res() response, @Param('id') ServiceId: string) {
    try {
      const existingPrestataireByService = await this.prestataireService.getprestataireByService(
        ServiceId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Prestataire By Service found successfully',
        data: existingPrestataireByService,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
  
  @Put('/:id')
  async updateprestataire(
    @Res() response,
    @Param('id') PrestataireId: string,
    @Body() updatePrestataireDto: UpdateprestataireDto,
  ) {
    try {
      const existingprestataire =
        await this.prestataireService.updateprestataire(
         PrestataireId,
          updatePrestataireDto,
        );
      return response.status(HttpStatus.OK).json({
        message: 'Prestataire has been successfully updated',
        data: existingprestataire,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get()
  async getAllprestataire(@Res() response) {
    try {
      const prestataireData =
        await this.prestataireService.getAllprestataires();
      return response.status(HttpStatus.OK).json({
        message: 'All prestataire data found successfully',
        status: HttpStatus.OK,
        data: prestataireData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get('/:id')
  async getprestataire(@Res() response, @Param('id') prestataireId: string) {
    try {
      const existingPrestataire = await this.prestataireService.getprestataire(
        prestataireId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Prestataire found successfully',
        data: existingPrestataire,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
 

  @Delete('/:id')
  async deleteprestataire(@Res() response, @Param('id') PrestataireId: string) {
    try {
      const deletedPrestataire =
        await this.prestataireService.deleteprestataire(PrestataireId);
      return response.status(HttpStatus.OK).json({
        message: 'Prestataire deleted successfully',
        status: HttpStatus.OK,
        data: deletedPrestataire,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
  @Get('/email')
  async PrestataireByemail(@Res() response, @Query('email') email: string) {
    try {
      const existingPrestataireByEmail =
        await this.prestataireService.getprestataireByEmail(email);
      return response.status(HttpStatus.OK).json({
        message: 'Prestataire found successfully by email',
        data: existingPrestataireByEmail,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
  @Get('/username')
  async PrestataireByusername(
    @Res() response,
    @Query('username') username: string,
  ) {
    try {
      const existingPrestataireByusername =
        await this.prestataireService.findByprestatairename(username);
      return response.status(HttpStatus.OK).json({
        message: 'Prestataire found successfully by username',
        data: existingPrestataireByusername,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

 


}
