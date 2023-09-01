import { Injectable ,NotFoundException} from '@nestjs/common';
import { Query, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Iadmin } from './entities/interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(@InjectModel('admin') private AdminModel: Model<Iadmin>) { }
  async createAdmin(createAdminDto: CreateAdminDto): Promise<Iadmin> {
    const newAdmin = await new this.AdminModel(createAdminDto);
    return newAdmin.save();
  } 
  async findById(id: string): Promise<Iadmin>{
    return this.AdminModel.findById(id);
  }
 
  async updateAdmin(AdminId: string, updateAdminDto: UpdateAdminDto): Promise<Iadmin> {
    const existingadmin = await this.AdminModel.findByIdAndUpdate(AdminId, updateAdminDto, { new: true });
    if (!existingadmin) {
      throw new NotFoundException(`Admin #${AdminId} not found`);
    }
    return existingadmin;
  }
  async getAllAdmins(): Promise<Iadmin[]> {
    const AdminData = await this.AdminModel.find().select("-__v");
    if (!AdminData || AdminData.length == 0) {
      throw new NotFoundException('Admin data not found!');
    }
    return AdminData;
  }
  async getAdmin(AdminId: string): Promise<Iadmin> {
    const existingAdmin = await this.AdminModel.findById(AdminId).exec();
    if (!existingAdmin) {
      throw new NotFoundException(`Admin #${AdminId} not found`);
    }
    return existingAdmin;
  }


  async getAdminByEmail(email: string): Promise<Iadmin[]> {
    const existingAdminByEmail = await this.AdminModel.find({email:email}).exec();
    if (!existingAdminByEmail) {
      throw new NotFoundException(`Admin #${email} not found`);
    }
    return existingAdminByEmail;
  }

  async findByAdminusername(username: string): Promise<Iadmin> {
    return this.AdminModel.findOne({ username }).exec();
  }
  async findByAdminEmail(email: string): Promise<Iadmin> {
    return this.AdminModel.findOne({ email }).exec();
  }

  async deleteAdmin(AdminId: string): Promise<Iadmin> {
    const deletedAdmin = await this.AdminModel.findByIdAndDelete(AdminId);
    if (!deletedAdmin) {
      throw new NotFoundException(`Admin #${AdminId} not found`);
    }
    return deletedAdmin;
  }
  
}
