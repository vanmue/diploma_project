import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JsonService } from 'src/utils/services/json/json.service';

@Controller('me')
@UseInterceptors(ClassSerializerInterceptor)
export class MeController {
  constructor(private readonly jsonService: JsonService) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearer')
  @Get()
  getMe(@Request() req) {
    const data = req.user;
    return this.jsonService.data(data);
  }
}
