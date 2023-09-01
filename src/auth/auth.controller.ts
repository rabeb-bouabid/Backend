/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Req, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { CreateLoginDto } from './dto/create-login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('file', {
        storage:diskStorage({
        destination: './upload/imagesUser',
         filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
   signup(@Body() createUserDto:CreateUserDto ,@UploadedFile()file) {
    createUserDto.file = file.filename;
    return this.authService.signUp(createUserDto);
   }


 
  @Post('/signin') //user
  signIn(@Body() data:CreateLoginDto) {

   return this.authService.signIn(data);


  }

  @Post('/signupadmin')
  @UseInterceptors(
    FileInterceptor('file', {
        storage:diskStorage({
        destination: './upload/imagesAdmin',
         filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  signupadmin(@Body() createAdminDto: CreateAdminDto ,@UploadedFile()file) {
    createAdminDto.file = file.filename; 
    return this.authService.signUpAdmin(createAdminDto);
  }




  @Post('/signinadmin') //login
  signInadmin(@Body() data: CreateLoginDto) {
    return this.authService.signInAdmin(data);
  }

  // @Post('/signin') //login
  // signIn(@Body() data: CreateLoginDto) {
  //   return this.authService.signIn(data);
  // }
 
  @UseGuards(AccessTokenGuard)
  @Get('logoutAdmin')
  logoutAdmin(@Req() req: Request) {
    return this.authService.logoutAdmin(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req:Request) {
    return this.authService.logout(req.user['sub']);


   }
}
