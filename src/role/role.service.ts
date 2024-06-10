import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name, 'common') private roleModel: Model<RoleDocument>,
  ) {}

  findAll() {
    return this.roleModel.find().exec();
  }

  async findByName(name: string): Promise<Role | undefined> {
    return this.roleModel.findOne({ name }).exec();
  }

  findOne(id: string) {
    return this.roleModel.findById(id).exec();
  }

  update(id: string, updateRoleDto: any) {
    return this.roleModel
      .findByIdAndUpdate(id, updateRoleDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.roleModel.findByIdAndDelete(id).exec();
  }

  create(createRoleDto: any) {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }
}
