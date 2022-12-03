import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliverableEntity } from 'src/deliverables/entities/deliverable.entity';
import { MasterEntity } from 'src/masters/entities/master.entity';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { copyKeys } from 'src/utils/copy-keys';
import { Raw, Repository } from 'typeorm';
import { AppointmentEntity } from './entites/appointment.entity';
import { CreateAppointmentEntity } from './entites/create-appointment.entity';
import { UpdateAppointmentEntity } from './entites/update-appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    private readonly profilesService: ProfilesService,
  ) {}

  async create(dto: CreateAppointmentEntity) {
    return await this.saveValues(dto, new AppointmentEntity());
  }
  async findAll() {
    return await this.appointmentRepository.find({
      relations: ['profile.user'],
    });
  }

  async findById(id: number) {
    return this.appointmentRepository.findOneByOrFail({ id });
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

    return await this.appointmentRepository.find({
      where,
      relations: ['profile.user'],
    });
  }

  async remove(id: number) {
    const appointment = await this.appointmentRepository.findOneByOrFail({
      id,
    });
    return await this.appointmentRepository.remove(appointment);
  }
  async update(id: number, dto: UpdateAppointmentEntity) {
    const appointment = await this.appointmentRepository.findOneByOrFail({
      id,
    });
    return await this.saveValues(dto, appointment);
  }

  private async saveValues(
    dto: CreateAppointmentEntity | UpdateAppointmentEntity,
    appointment: AppointmentEntity,
  ) {
    appointment = copyKeys(['comments', 'from', 'to'], dto, appointment);

    const { deliverableId, userId, masterId, shopId } = dto;
    if (deliverableId) {
      const deliverable = new DeliverableEntity();
      deliverable.id = deliverableId;
      appointment.deliverable = deliverable;
    }
    if (masterId) {
      const master = new MasterEntity();
      master.id = masterId;
      appointment.master = master;
    }
    if (shopId) {
      const shop = new ShopEntity();
      shop.id = shopId;
      appointment.shop = shop;
    }
    if (userId) {
      appointment.profile = await this.profilesService.findCustomer(userId);
    }
    return this.appointmentRepository.save(appointment);
  }
}
