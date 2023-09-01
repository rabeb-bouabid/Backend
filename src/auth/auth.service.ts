/* eslint-disable prettier/prettier */
import {Injectable,NotAcceptableException,ForbiddenException,BadRequestException,} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { CreateLoginDto } from './dto/create-login.dto';
import { AdminService } from 'src/admin/admin.service';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private AdminService: AdminService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  
  async signUp(createuserdto: CreateUserDto): Promise<any> {
    const userExists = await this.usersService.findByUsername(
      createuserdto.username,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    //const hash = await this.hashData(createuserdto.password);
    const newUser = await this.usersService.createUser(createuserdto);
    const tokens = await this.getTokens(newUser._id, newUser.username);
    await this.upddateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: CreateLoginDto) {
    const user = await this.usersService.findByUsername(data.username);
    if (!user) throw new BadRequestException('user does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user._id, user.username);
    await this.upddateRefreshToken(user._id, tokens.refreshToken);
    return {tokens,user}
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        { secret: 'abcd', expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        { secret: 'abc', expiresIn: '7d' },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async upddateRefreshToken(UserId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateUser(UserId, {
      refreshtoken: hashedRefreshToken,
    });
  }

  async refreshTokens(UserId: string, refreshToken: string) {
    const user = await this.usersService.getUser(UserId);
    if (!user || !user.refreshtoken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshtoken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.username);
    await this.upddateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  //admin
  async signUpAdmin(createadmindto: CreateAdminDto): Promise<any> {
    const adminExists = await this.AdminService.findByAdminusername(
      createadmindto.username,
    );
    if (adminExists) {
      throw new BadRequestException('Admin already exists');
    }
    //const hash =  await this.hashData (createuserdto.password);
    const newAdmin = await this.AdminService.createAdmin(createadmindto);
    const tokens = await this.getTokens(newAdmin._id, newAdmin.username);
    await this.upddateRefreshTokenAdmin(newAdmin._id, tokens.refreshToken);
    return tokens;
  }
  async signInAdmin(data: CreateLoginDto) {
    const admin = await this.AdminService.findByAdminusername(data.username);
    if (!admin) throw new BadRequestException('Admin does not exist');
    const passwordMatches = await argon2.verify(admin.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(admin._id, admin.username);
    await this.upddateRefreshTokenAdmin(admin._id, tokens.refreshToken);
    return tokens;
  }
  async getTokensAdmin(adminId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: adminId,
          username,
        },
        { secret: 'abcd', expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        {
          sub: adminId,
          username,
        },
        { secret: 'abc', expiresIn: '7d' },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async upddateRefreshTokenAdmin(AdminId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.AdminService.updateAdmin(AdminId, {
      refreshtoken: hashedRefreshToken,
    });
  }
  hashData(data: string) {
    return argon2.hash(data);
  }
  async logoutAdmin(adminId: string) {
    this.AdminService.updateAdmin(adminId, { refreshtoken: null });
  }
  async refreshTokensAdmin(AdminId: string, refreshToken: string) {
    const admin = await this.AdminService.getAdmin(AdminId);
    if (!admin || !admin.refreshtoken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      admin.refreshtoken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokensAdmin(admin.id, admin.username);
    await this.upddateRefreshTokenAdmin(admin.id, tokens.refreshToken);
    return tokens;
  }

    
  async logout(userId: string) {
    this.usersService.updateUser(userId, { refreshtoken: null });
  }
}