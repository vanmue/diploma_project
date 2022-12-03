import { Test, TestingModule } from '@nestjs/testing';
import { UserAppointmentsController } from './user-appointments.controller';

describe('AppointmentsController', () => {
  let controller: UserAppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAppointmentsController],
    }).compile();

    controller = module.get<UserAppointmentsController>(
      UserAppointmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
