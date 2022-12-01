import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { DeliverablesService } from 'src/deliverables/deliverables.service';
import { MastersService } from 'src/masters/masters.service';
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
    private readonly customersService: CustomersService,
    private readonly mastersService: MastersService,
    private readonly shopsService: ShopsService,
  ) {}

  async create(dto: CreateAppointmentEntity) {
    const values = await this.getValues(dto);
    return await this.appointmentRepository.save(values);
  }
  async findAll() {
    return await this.appointmentRepository.find();
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
      relations: ['customer'],
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
    let values = await this.getValues(dto);
    values = { ...appointment, ...values };
    return await this.appointmentRepository.save(values);
  }
  private async getValues(
    dto: CreateAppointmentEntity | UpdateAppointmentEntity,
  ) {
    let values = {};
    const scalars = ['comments', 'from', 'to'];
    scalars.forEach((s) => {
      if (dto[s]) {
        values = { ...values, [s]: dto[s] };
      }
    });

    const { deliverableId, customerId, masterId, shopId } = dto;
    if (deliverableId) {
      const deliverable = await this.deliverablesService.findById(
        deliverableId,
      );
      values = { ...values, deliverable };
    }
    if (customerId) {
      const customer = await this.customersService.findById(customerId);
      values = { ...values, customer };
    }
    if (masterId) {
      const master = await this.mastersService.findById(masterId);
      values = { ...values, master };
    }
    if (shopId) {
      const shop = await this.shopsService.findById(shopId);
      values = { ...values, shop };
    }
    return values;
  }
}
