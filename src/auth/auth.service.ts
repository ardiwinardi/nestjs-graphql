import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './entities/jwt-payload.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.userService.findByEmail(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user._id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
