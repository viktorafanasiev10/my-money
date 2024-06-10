import { Module } from '@nestjs/common';
import { HouseholdService } from './household.service';
import { HouseholdController } from './household.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Household, HouseholdSchema } from './entities/household.entity';
import { UserModule } from 'src/user/user.module';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Household.name, schema: HouseholdSchema }],
      'common',
    ),
    UserModule,
    CurrencyModule,
  ],
  controllers: [HouseholdController],
  providers: [HouseholdService],
})
export class HouseholdModule {}
