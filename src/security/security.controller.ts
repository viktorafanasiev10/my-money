import { Body, Request, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';
import { SecurityService } from './security.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('security')
@Controller('security')
export class SecurityController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private securityService: SecurityService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    const role = await this.roleService.findByName('user');
    return this.userService.create({
      username: body.username,
      email: body.email,
      password: body.password,
      role: role._id,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.securityService.login(user);
  }
}
