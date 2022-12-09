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
import { MeService } from '../me.service';

@Controller('me/profiles')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfilesByMeController {
  constructor(
    private readonly meService: MeService,
    private readonly jsonService: JsonService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('bearer')
  @Get()
  async getAll(@Request() req) {
    const { user } = req;

    const data = await this.meService.findProfiles(user.id);
    return this.jsonService.data(data);
  }
}
