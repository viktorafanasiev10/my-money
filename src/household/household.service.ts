import { Injectable } from '@nestjs/common';
import { CreateHouseholdDto } from './dto/create-household.dto';
import { UpdateHouseholdDto } from './dto/update-household.dto';
import { Household, HouseholdDocument } from './entities/household.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HouseholdService {
  constructor(
    @InjectModel(Household.name, 'common')
    private userModel: Model<HouseholdDocument>,
  ) {}

  create(createHouseholdDto: CreateHouseholdDto) {
    return 'This action adds a new household';
  }

  findAll() {
    return `This action returns all household`;
  }

  findOne(id: number) {
    return `This action returns a #${id} household`;
  }

  update(id: number, updateHouseholdDto: UpdateHouseholdDto) {
    return `This action updates a #${id} household`;
  }

  remove(id: number) {
    return `This action removes a #${id} household`;
  }
}
