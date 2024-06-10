import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { SecurityService } from './security.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { SecurityController } from './security.controller';
import { RoleModule } from 'src/role/role.module';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret_123',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController, SecurityController],
  providers: [
    SecurityService,
    JwtStrategy,
    LocalStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
  ],
  exports: [SecurityService],
})
export class SecurityModule {}
