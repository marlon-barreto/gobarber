import AppError from '@shared/errors/AppError';
import FakeAppointmenstRepository from '../repositories/fakes/FakeAppointmenstRepository';
import CreateAppointmenstService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('shoud be able to create a new appointment', async () => {
    const fakeAppointmenstRepository = new FakeAppointmenstRepository();

    const createAppointment = new CreateAppointmenstService(
      fakeAppointmenstRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123232',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123232');
  });

  it('shoud not be able to create a two appointment on the same time', async () => {
    const fakeAppointmenstRepository = new FakeAppointmenstRepository();

    const createAppointment = new CreateAppointmenstService(
      fakeAppointmenstRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123232',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123235',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
