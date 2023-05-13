import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/login-input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput) {
    const user = await this.userService.findByEmail(loginInput.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, id: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
