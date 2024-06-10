import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SecurityService {
  private readonly logger = new Logger(SecurityService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      this.logger.log(result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    this.logger.log(user);
    const foundUser = await this.userService.findOne(user.username);
    const payload = {
      username: foundUser.username,
      sub: foundUser._id,
      role: foundUser.role.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
