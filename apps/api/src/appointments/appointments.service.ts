import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliverablesService } from 'src/deliverables/deliverables.service';
import { MastersService } from 'src/masters/masters.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { ShopsService } from 'src/shops/shops.service';
import { Raw, Repository } from 'typeorm';
import { AppointmentEntity } from './entites/appointment.entity';
import { CreateAppointmentEntity } from './entites/create-appointment.entity';
import { UpdateAppointmentEntity } from './entites/update-appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    private readonly deliverablesService: DeliverablesService,
    private readonly mastersService: MastersService,
    private readonly profilesService: ProfilesService,
    private readonly shopsService: ShopsService,
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
    const scalars = ['comments', 'from', 'to'];
    scalars.forEach((s) => {
      if (dto[s]) {
        appointment[s] = dto[s];
      }
    });

    const { deliverableId, profileId, masterId, shopId } = dto;
    if (deliverableId) {
      appointment.deliverable = await this.deliverablesService.findById(
        deliverableId,
      );
    }
    if (masterId) {
      appointment.master = await this.mastersService.findById(masterId);
    }
    if (shopId) {
      appointment.shop = await this.shopsService.findById(shopId);
    }
    if (profileId) {
      const profile = await this.profilesService.findById(dto.profileId);
      appointment.profile = profile;
    }
    return this.appointmentRepository.save(appointment);
  }
}
