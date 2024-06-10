import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { CurrencyModule } from './currency/currency.module';
import { TenantDatabaseModule } from './tenant-database/tenant-database.module';
import { CommonDatabaseModule } from './common-database/common-database.module';
import { HouseholdModule } from './household/household.module';
import { UserModule } from './user/user.module';
import { SecurityModule } from './security/security.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    CommonDatabaseModule,
    TenantDatabaseModule,
    CurrencyModule,
    UserModule,
    SecurityModule,
    RoleModule,
    HouseholdModule,
    CommonDatabaseModule,
    TenantDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
