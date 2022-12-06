import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DeliverablesService } from 'src/deliverables/deliverables.service';
import { JsonService } from 'src/utils/services/json/json.service';
import { MastersService } from '../masters.service';

@Controller('masters/:masterId/deliverables')
export class DeliverablesByMasterController {
  constructor(
    private readonly deliverablesService: DeliverablesService,
    private readonly mastersService: MastersService,
    private readonly jsonService: JsonService,
  ) {}
  @Delete(':deliverableId')
  async remove(
    @Param('masterId') masterId: number,
    @Param('deliverableId') deliverableId: number,
  ) {
    const data = await this.mastersService.removeDeliverable(
      masterId,
      deliverableId,
    );
    return this.jsonService.data(data);
  }
  @Get()
  async getAll(@Param('masterId') masterId: number) {
    const data = await this.deliverablesService.findByMaster(masterId);
    return this.jsonService.data(data);
  }
  @Get(':deliverableId')
  async getOne(
    @Param('masterId') masterId: number,
    @Param('deliverableId') deliverableId: number,
  ) {
    const data = await this.deliverablesService.findByMasterAndDeliverable(
      masterId,
      deliverableId,
    );
    return this.jsonService.data(data);
  }
  @Post(':deliverableId')
  async create(
    @Param('masterId') masterId: number,
    @Param('deliverableId') deliverableId: number,
  ) {
    const data = await this.mastersService.addDeliverable(
      masterId,
      deliverableId,
    );
    return this.jsonService.data(data);
  }
}
