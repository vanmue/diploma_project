import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateByEmail(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user == null) {
      return null;
    }
    return compare(password, user.password).then((equal) => {
      if (equal) {
        return user;
      }
      return null;
    });
  }

  async login(user: UserEntity) {
    const payload = {
      sub: user.id,
      password: user.password,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
