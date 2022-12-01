import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CustomersService {
  constructor(private readonly usersService: UsersService) {}
  async findById(id: number) {
    return await this.usersService.findById(id);
  }
}
