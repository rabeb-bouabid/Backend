/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { diskStorage } from 'multer';
import { CreateServicesDto } from './dto/create-service.dto';
import { UpdateServicesDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@Controller('Services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
  @Post()
  /*@UseInterceptors(
    FileInterceptor("file",{
        storage:diskStorage({
        destination: "./upload",
        filename:(request, file, callback)=>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )*/
  @UseInterceptors(
    FileInterceptor('file', {
        storage:diskStorage({
        destination: './upload/imagesService',
         filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )

  async CreateServices(@Res() response, @Body() CreateServicesDto: CreateServicesDto,@UploadedFile()file) {
    try {
      CreateServicesDto.file=file.filename
      const newService = await this.servicesService.createServices(CreateServicesDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Service has been created successfully',
        status: HttpStatus.OK,
        data: newService
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Service not created!' + err,
        data: null
      });
    }
  }

  @Get('GetAllServices')
  async GetAllServices(@Res() response) {
    try {
      const ServicesData = await this.servicesService.getAllServices();
      return response.status(HttpStatus.OK).json({
        message: 'All Services data found successfully', status: HttpStatus.OK, data: ServicesData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  @Get('GetServiceById/:id')
  async GetService(@Res() response, @Param('id') ServiceId: string) {
    try {
      const existingService = await
        this.servicesService.getService(ServiceId);
      return response.status(HttpStatus.OK).json({
        message: 'Service found successfully',
        data: existingService,
        status:HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  @Put('UpdateService/:id')
  async UpdateService(@Res() response, @Param('id') ServiceId: string, @Body() UpdateServiceDto: UpdateServicesDto) {
    try {
      const existingService = await this.servicesService.updateService(ServiceId, UpdateServiceDto);
      return response.status(HttpStatus.OK).json({
        message: 'Service has been successfully updated',
        data: existingService,
        status: HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  @Delete('DeleteService/:id')
  async DeleteService(@Res() response, @Param('id') ServiceId: string) {
    try {
      const deletedService = await this.servicesService.deleteService(ServiceId);
      return response.status(HttpStatus.OK).json({
        message: 'Product deleted successfully',
        status: HttpStatus.OK,
        data: deletedService,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
}
