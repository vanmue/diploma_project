import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliverableEntity } from 'src/deliverables/entities/deliverable.entity';
import { MasterEntity } from 'src/masters/entities/master.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { Raw, Repository } from 'typeorm';
import { AppointmentEntity } from './entites/appointment.entity';
import { CreateAppointmentEntity } from './entites/create-appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async create(dto: CreateAppointmentEntity) {
    const { shopId, masterId, deliverableId } = dto;

    const shop = new ShopEntity();
    shop.id = shopId;

    const master = new MasterEntity();
    master.id = masterId;

    const deliverable = new DeliverableEntity();
    deliverable.id = deliverableId;

    return await this.appointmentRepository.save({
      ...dto,
      shop,
      master,
      deliverable,
    });
  }
  async findAll() {
    return await this.appointmentRepository.find();
  }
  async findByMaster(masterId: number, shopId: number, date?: Date) {
    let where = {};
    where = { ...where, master: { id: masterId }, shop: { id: shopId } };
    if (date) {
      where = {
        ...where,
        from: Raw((alias) => `date_trunc('day', ${alias}) = :dt`, {
          dt: date,
        }),
      };
    }

    return await this.appointmentRepository.find({ where });
  }
}
