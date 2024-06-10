import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

import * as bcrypt from 'bcryptjs';
import {
  Household,
  HouseholdDocument,
  HouseholdSchema,
} from 'src/household/entities/household.entity';
import { TenantDatabaseService } from 'src/tenant-database/tenant-database.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, 'common') private userModel: Model<UserDocument>,
    private tenantDatabaseService: TenantDatabaseService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, role } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      username,
      password: hashedPassword,
      role,
    });
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().populate('role').exec();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).populate('role').lean().exec();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).populate('role').exec();
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userModel
      .findById(userId)
      .populate('role')
      .populate('households')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updateUserActiveHousehold(
    userId: string,
    householdId: string,
  ): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { activeHousehold: householdId },
        { new: true },
      )
      .exec();
  }

  async addHouseholdToUser(userId: string, householdId: string): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $push: { households: householdId } },
        { new: true },
      )
      .exec();
  }

  async createDefaultHousehold(
    username: string,
    userId: string,
  ): Promise<Household> {
    const connection = await this.tenantDatabaseService.getConnection(userId);
    const householdModel = connection.model<HouseholdDocument>(
      'Household',
      HouseholdSchema,
    );
    const household = new householdModel({
      name: `${username}'s Household`,
      users: [userId],
    });
    return household.save();
  }
}
