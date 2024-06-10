import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenantDatabaseService } from './tenant-database.service';
import { JwtModule } from '@nestjs/jwt';
import { TenantMiddleware } from './tenant.middleware';

@Module({
  imports: [JwtModule.register({ secret: 'your_jwt_secret_123' })],
  providers: [TenantDatabaseService, TenantMiddleware],
  exports: [TenantDatabaseService],
})
export class TenantDatabaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
